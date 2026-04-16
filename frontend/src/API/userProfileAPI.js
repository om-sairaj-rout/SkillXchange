const BASE = "http://localhost:3000";

export const updateProfile = async(userId, profileData) => {
    const res = await fetch(`${BASE}/api/update-Profile/${userId}`, {
        method : "PUT",
        credentials: "include",
        body: profileData,
    });
    if(!res.ok){
        const errorData = await res.json();
        throw new Error(errorData.message || "Profile update failed"); 
    }
    return res.json();
}

export const updateSkill = async(userId, profileData) => {
    const res = await fetch(`${BASE}/api/update-Skill/${userId}`, {
        method : "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(profileData),
    });
    if(!res.ok){
        const errorData = await res.json();
        throw new Error(errorData.message || "Profile update failed"); 
    }
    return res.json();
}

export const removeSkillAPI = async(userId, skillName , isTeach) => {
    const res = await fetch(`${BASE}/api/remove-Skill/${userId}`, {
        method : "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({skillName , isTeach}),
    });
    if(!res.ok){
        const errorData = await res.json();
        throw new Error(errorData.message || "Profile update failed"); 
    }
    return res.json();
}