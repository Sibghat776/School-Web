import React from 'react';
import { GraduationCap, BookOpenText, CalendarCheck, Users } from 'lucide-react';
import Footer from './Footer';
import Navbar from './Navbar';

const Admission = () => {
    return (
        <>
            <Navbar />
            <div className="bg-[#dee9ee] min-h-fit py-10 px-4 md:px-16">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl font-bold text-center text-[#1d1449] mb-4">Admissions at Noor Public School</h1>
                    <p className="text-center text-gray-700 text-lg mb-10">
                        Unlock a bright future for your child with quality education, character building, and a nurturing environment.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-[#498138] hover:shadow-2xl transition duration-300">
                            <div className="flex items-center gap-4 mb-4">
                                <GraduationCap className="text-[#498138] w-8 h-8" />
                                <h2 className="text-xl font-semibold text-[#1d1449]">Who Can Apply?</h2>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                We welcome students from Nursery to Class 10. Admissions are open to all children based on merit, availability, and a short assessment.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-[#7eadc9] hover:shadow-2xl transition duration-300">
                            <div className="flex items-center gap-4 mb-4">
                                <BookOpenText className="text-[#7eadc9] w-8 h-8" />
                                <h2 className="text-xl font-semibold text-[#1d1449]">Required Documents</h2>
                            </div>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                <li>Birth Certificate / B-Form</li>
                                <li>Passport-sized Photographs</li>
                                <li>Previous School Record (if any)</li>
                                <li>Parent/Guardian CNIC Copy</li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-[#234e18] hover:shadow-2xl transition duration-300">
                            <div className="flex items-center gap-4 mb-4">
                                <CalendarCheck className="text-[#234e18] w-8 h-8" />
                                <h2 className="text-xl font-semibold text-[#1d1449]">Admission Schedule</h2>
                            </div>
                            <p className="text-gray-700">
                                Admissions usually open in **March** for the new academic session. Exact dates are announced via our notice board and official website.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-[#5f5971] hover:shadow-2xl transition duration-300">
                            <div className="flex items-center gap-4 mb-4">
                                <Users className="text-[#5f5971] w-8 h-8" />
                                <h2 className="text-xl font-semibold text-[#1d1449]">Why Choose Us?</h2>
                            </div>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                <li>Experienced and qualified faculty</li>
                                <li>Islamic and modern education blend</li>
                                <li>Co-curricular & character building programs</li>
                                <li>Safe and secure learning environment</li>
                            </ul>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-lg text-gray-800">
                            For further details, please visit the school or call us during working hours.
                        </p>
                        <p className="text-md text-[#1d1449] font-semibold mt-2">
                            Contact: 0315 2779033 | Email: <a href="mailto:noorpubsch@gmail.com">noorpubsch@gmail.com</a>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Admission;