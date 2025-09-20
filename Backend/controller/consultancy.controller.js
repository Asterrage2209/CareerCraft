const { GoogleGenerativeAI } = require("@google/generative-ai");
const ChatModel = require("../models/chat.model");
const userModel = require("../models/user.model");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getCareerAdvice = async (req, res) => {
    try {
        const { message, sessionId } = req.body;
        const userId = req.user.id;

        if (!message || !sessionId) {
            return res.status(400).json({ message: "Message and sessionId are required" });
        }

        let chatSession = await ChatModel.findOne({ 
            userId, 
            sessionId, 
            isActive: true 
        });

        if (!chatSession) {
            const user = await userModel.findById(userId).select("-password");
            
            chatSession = new ChatModel({
                userId,
                sessionId,
                messages: [],
                context: {
                    userProfile: {
                        name: user.name,
                        role: user.role,
                        skills: user.skills || [],
                        interests: user.interests || []
                    },
                    careerGoals: [],
                    currentSession: {
                        topic: "",
                        lastAdvice: "",
                        followUpQuestions: []
                    }
                }
            });
        }

        chatSession.messages.push({
            role: 'user',
            content: message,
            timestamp: new Date()
        });

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = createIndianCareerPrompt(chatSession, message);

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiResponse = response.text();

        chatSession.messages.push({
            role: 'assistant',
            content: aiResponse,
            timestamp: new Date()
        });

        updateChatContext(chatSession, message, aiResponse);

        await chatSession.save();

        res.json({
            success: true,
            response: aiResponse,
            sessionId: chatSession.sessionId
        });

    } catch (error) {
        console.error("Error in getCareerAdvice:", error);
        res.status(500).json({ 
            message: "Failed to get career advice", 
            error: error.message 
        });
    }
};

const getChatHistory = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const userId = req.user.id;

        const chatSession = await ChatModel.findOne({ 
            userId, 
            sessionId, 
            isActive: true 
        });

        if (!chatSession) {
            return res.json({ messages: [] });
        }

        res.json({ 
            messages: chatSession.messages,
            context: chatSession.context
        });

    } catch (error) {
        console.error("Error getting chat history:", error);
        res.status(500).json({ 
            message: "Failed to get chat history", 
            error: error.message 
        });
    }
};

const createNewSession = async (req, res) => {
    try {
        const userId = req.user.id;
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const user = await userModel.findById(userId).select("-password");
        
        const chatSession = new ChatModel({
            userId,
            sessionId,
            messages: [],
            context: {
                userProfile: {
                    name: user.name,
                    role: user.role,
                    skills: user.skills || [],
                    interests: user.interests || []
                },
                careerGoals: [],
                currentSession: {
                    topic: "",
                    lastAdvice: "",
                    followUpQuestions: []
                }
            }
        });

        await chatSession.save();

        res.json({ 
            success: true,
            sessionId: chatSession.sessionId 
        });

    } catch (error) {
        console.error("Error creating new session:", error);
        res.status(500).json({ 
            message: "Failed to create new session", 
            error: error.message 
        });
    }
};

const createIndianCareerPrompt = (chatSession, userMessage) => {
    const { userProfile, careerGoals, currentSession } = chatSession.context;
    
    const basePrompt = `You are an expert career counselor specializing in the Indian education and job market. You have deep knowledge of:

**INDIAN EDUCATION SYSTEM:**
- CBSE, ICSE, State Boards, IB, Cambridge
- JEE, NEET, CLAT, CAT, GATE, UPSC, SSC exams
- Engineering (IITs, NITs, IIITs, private colleges)
- Medical (AIIMS, state medical colleges)
- Commerce (CA, CS, CMA, MBA from IIMs, XLRI, etc.)
- Arts & Humanities (DU, JNU, TISS, etc.)
- Skill development programs (NSDC, PMKVY)

**INDIAN JOB MARKET:**
- IT/Software (TCS, Infosys, Wipro, HCL, startups)
- Banking & Finance (SBI, HDFC, ICICI, RBI, SEBI)
- Government jobs (IAS, IPS, IFS, state services)
- Healthcare (AIIMS, Apollo, Fortis, government hospitals)
- Manufacturing (Tata, Reliance, Adani, Maruti)
- E-commerce (Flipkart, Amazon, Zomato, Swiggy)
- Consulting (McKinsey, BCG, Bain, Deloitte)
- Media & Entertainment (Bollywood, OTT, news channels)

**CAREER PATHS BY STREAM:**
- Science: Engineering, Medicine, Research, Data Science, AI/ML
- Commerce: CA, MBA, Banking, Finance, Entrepreneurship
- Arts: Civil Services, Media, Law, Social Work, Teaching
- Vocational: Skilled trades, technical courses, apprenticeships

**USER PROFILE:**
- Name: ${userProfile.name}
- Current Role: ${userProfile.role}
- Skills: ${userProfile.skills.join(', ') || 'Not specified'}
- Interests: ${userProfile.interests.join(', ') || 'Not specified'}`;

    let contextPrompt = basePrompt;

    if (careerGoals.length > 0) {
        contextPrompt += `\n- Career Goals: ${careerGoals.join(', ')}`;
    }

    if (currentSession.topic) {
        contextPrompt += `\n- Current Discussion Topic: ${currentSession.topic}`;
    }

    if (currentSession.lastAdvice) {
        contextPrompt += `\n- Previous Advice Given: ${currentSession.lastAdvice}`;
    }

    contextPrompt += `\n\nCONVERSATION HISTORY:`;
    chatSession.messages.slice(-6).forEach(msg => {
        contextPrompt += `\n${msg.role === 'user' ? 'Student' : 'Career Counselor'}: ${msg.content}`;
    });

    contextPrompt += `\n\nCURRENT MESSAGE FROM STUDENT: ${userMessage}

**YOUR RESPONSE GUIDELINES:**
1. **Be culturally sensitive** - Understand Indian family dynamics, societal expectations, and economic realities
2. **Provide specific Indian examples** - Mention Indian companies, colleges, exams, and career paths
3. **Include practical steps** - Give actionable advice with timelines and resources
4. **Consider financial aspects** - Discuss course fees, salary expectations, ROI of education
5. **Address common concerns** - Job security, work-life balance, family pressure, location preferences
6. **Suggest Indian resources** - Naukri.com, Shine.com, LinkedIn India, college websites, government portals
7. **Be encouraging but realistic** - Balance aspirations with practical considerations
8. **Ask follow-up questions** - To better understand their specific situation and goals

**RESPONSE FORMAT:**
- Start with empathy and understanding
- Provide specific, actionable advice
- Include relevant Indian examples and resources
- Ask 1-2 thoughtful follow-up questions
- Keep response conversational and supportive
- Length: 150-300 words
- IMPORTANT: Use plain text only, no markdown formatting, no asterisks, no bold text, no special characters

Respond as a knowledgeable, caring Indian career counselor who understands the unique challenges and opportunities in the Indian job market. Use only plain text formatting.`;

    return contextPrompt;
};

const updateChatContext = (chatSession, userMessage, aiResponse) => {
    const message = userMessage.toLowerCase();
    
    const goalKeywords = ['want to', 'goal', 'aspire', 'dream', 'plan to', 'aim to', 'become', 'pursue'];
    if (goalKeywords.some(keyword => message.includes(keyword))) {
        const potentialGoal = userMessage;
        if (!chatSession.context.careerGoals.includes(potentialGoal)) {
            chatSession.context.careerGoals.push(potentialGoal);
        }
    }

    if (message.includes('career') || message.includes('job') || message.includes('profession')) {
        chatSession.context.currentSession.topic = 'Career Planning';
    } else if (message.includes('skill') || message.includes('learn') || message.includes('course') || message.includes('training')) {
        chatSession.context.currentSession.topic = 'Skill Development';
    } else if (message.includes('interview') || message.includes('resume') || message.includes('cv') || message.includes('placement')) {
        chatSession.context.currentSession.topic = 'Job Search';
    } else if (message.includes('exam') || message.includes('entrance') || message.includes('jee') || message.includes('neet') || message.includes('cat') || message.includes('gate')) {
        chatSession.context.currentSession.topic = 'Exam Preparation';
    } else if (message.includes('college') || message.includes('university') || message.includes('admission') || message.includes('iit') || message.includes('iim')) {
        chatSession.context.currentSession.topic = 'Education Planning';
    } else if (message.includes('salary') || message.includes('package') || message.includes('income') || message.includes('money')) {
        chatSession.context.currentSession.topic = 'Salary & Compensation';
    } else if (message.includes('startup') || message.includes('entrepreneur') || message.includes('business') || message.includes('own')) {
        chatSession.context.currentSession.topic = 'Entrepreneurship';
    } else if (message.includes('government') || message.includes('sarkari') || message.includes('upsc') || message.includes('ssc') || message.includes('ias')) {
        chatSession.context.currentSession.topic = 'Government Jobs';
    }

    chatSession.context.currentSession.lastAdvice = aiResponse.substring(0, 200) + '...';
    
    const followUpKeywords = ['what', 'how', 'which', 'when', 'where', 'why'];
    const sentences = aiResponse.split(/[.!?]+/);
    const questions = sentences.filter(sentence => 
        followUpKeywords.some(keyword => sentence.toLowerCase().includes(keyword)) && 
        sentence.includes('?')
    );
    
    if (questions.length > 0) {
        chatSession.context.currentSession.followUpQuestions = questions.slice(0, 2);
    }
};

module.exports = {
    getCareerAdvice,
    getChatHistory,
    createNewSession
};
