import ourTeam from "../../assets/our-team.png";
import coreValues from "../../assets/core-values.png";

const AboutSection = () => {
  return (
    <>
        {/* Our Mission Section */}
                <section className="py-2 mb-12">
                  <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                      Our Mission
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                      At skillXchange, we believe that everyone has something valuable
                      to teach and something new to learn. Our mission is to break down
                      barriers to learning by creating an accessible, intuitive platform
                      where knowledge can be freely exchanged, fostering a global
                      community of lifelong learners and educators.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                      <div className="p-6 bg-white rounded-xl shadow-md">
                        <h3 className="text-xl font-semibold text-orange-500 mb-3">
                          Empowerment
                        </h3>
                        <p className="text-gray-600">
                          Empowering individuals to share their expertise and pursue
                          their passions.
                        </p>
                      </div>
                      <div className="p-6 bg-white rounded-xl shadow-md">
                        <h3 className="text-xl font-semibold text-orange-500 mb-3">
                          Community
                        </h3>
                        <p className="text-gray-600">
                          Building a supportive and collaborative global learning
                          community.
                        </p>
                      </div>
                      <div className="p-6 bg-white rounded-xl shadow-md">
                        <h3 className="text-xl font-semibold text-orange-500 mb-3">
                          Accessibility
                        </h3>
                        <p className="text-gray-600">
                          Making quality education and mentorship available to everyone,
                          everywhere.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
        
                {/* Our Story / Team Section */}
                <section className="py-12">
                  <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-gray-900 text-center mb-10">
                      Our Story & Values
                    </h2>
        
                    <div className="flex flex-col md:flex-row items-center gap-10 mb-10 p-8">
                      <div className="md:w-1/2">
                        <h3 className="text-2xl font-semibold text-orange-500 mb-4">
                          How We Started
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          skillXchange began with a simple idea: that informal learning
                          circles could be scaled globally. Our founders envisioned a
                          platform where anyone could easily find a mentor or become
                          one.
                        </p>
                      </div>
                      <div className="md:w-1/2">
                        <img
                          className="w-full rounded-lg object-cover"
                          src={ourTeam}
                          alt="Our Team at skillXchange"
                        />
                      </div>
                    </div>
        
                    <div className="flex flex-col md:flex-row-reverse items-center gap-10 bg-white p-8">
                      <div className="md:w-1/2">
                        <h3 className="text-2xl font-semibold text-orange-500 mb-4">
                          Our Core Values
                        </h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                          <li>Passion for Learning</li>
                          <li>Inclusivity & Diversity</li>
                          <li>Innovation & Adaptability</li>
                          <li>Integrity & Trust</li>
                        </ul>
                      </div>
                      <div className="md:w-1/2">
                        <img
                          className="w-full rounded-lg object-cover"
                          src={coreValues}
                          alt="Core Values of skillXchange"
                        />
                      </div>
                    </div>
                  </div>
                </section>
    </>
  )
}

export default AboutSection