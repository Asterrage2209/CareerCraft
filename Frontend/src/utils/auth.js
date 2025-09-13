// Utility function to check password strength
export const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    
    // 0=None, 1=Weak, 2=Medium, 3=Strong
    if (strength > 3) strength = 3;
    if (password.length > 0 && password.length < 8) return 0;
    if (password.length === 0) return -1; 
    
    return strength;
};