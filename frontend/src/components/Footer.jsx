import React from 'react'

const Footer = () => {
    
    const primaryOrangeText = "text-orange-500";

    return (
        <footer className="bg-gray-800 text-white py-4 mt-10">
            <div className="container mx-auto px-4 text-center text-sm">
            <p>
                &copy; {new Date().getFullYear()} skill
                <span className={primaryOrangeText}>X</span>change. All rights
                reserved.
            </p>
            </div>
        </footer>
    )
}

export default Footer