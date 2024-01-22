import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import yellowBeltPdf from '../assets/youth-grey.pdf';
import logo from '../assets/logo-champ.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import OpenSansRegular from '../assets/OpenSans.ttf';
import fontkit from '@pdf-lib/fontkit';
import adultWhite2 from '../assets/Certs/ADULT/WHITE/ADULT-WHITE-2nd.pdf'
  
  async function generateCertificate(firstName, lastName, instructor1, instructor2, dateAwarded, studentId, ageGroup, beltAwarded, degreeAwarded) {
    // Construct the PDF path based on user input
    const pdfPath = `../assets/Certs/${ageGroup}/${beltAwarded}/${ageGroup}-${beltAwarded}-${degreeAwarded}.pdf`;
    console.log('the path', pdfPath)

    // Load the existing PDF template
    const { default: pdf } = await import(pdfPath);
    const existingPdfBytes = await fetch(pdf).then(res => res.arrayBuffer());
  
    // Load the existing PDF document
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
  
    // Add font kit to the project
    pdfDoc.registerFontkit(fontkit);
  
    // Load the Open Sans font
    const fontBytes = await fetch(OpenSansRegular).then(res => res.arrayBuffer());
    const openSansFont = await pdfDoc.embedFont(fontBytes);
    
    const page = pdfDoc.getPages()[0];

    const pageWidth = page.getSize().width;
    const fontSize = 48; // Adjust this based on your design needs

    const fullName = `${firstName} ${lastName}`;

    const xName = (pageWidth - openSansFont.widthOfTextAtSize(fullName, fontSize)) / 2;

  
    // Set text coordinates
    //const xFirstName = 340;
    const yFirstName = 405;
    const xInstructor1 = 368;
    const xInstructor2 = 740;
    const yInstructor = 116;
    const xDateAwarded = 540;
    const yDateAwarded = 195;
    const xStudentId = 870;
    const yStudentId = 747.5;

    // Set coordinates based on ageGroup
  const coordinates = ageGroup === 'ADULT'
  ? {
      yFirstName: 380, // Adjust this based on your design needs,
      xInstructor1: 305,  // Adjust this based on your design needs,
      xInstructor2: 678, // Adjust this based on your design needs,
      yInstructor: 147.5, // Adjust this based on your design needs,
      xDateAwarded: 490, // Adjust this based on your design needs,
      yDateAwarded: 217.5, // Adjust this based on your design needs,
      xStudentId: 828, // Adjust this based on your design needs,
      yStudentId: 680, // Adjust this based on your design needs,
    }
  : {
      yFirstName,
      xInstructor1,
      xInstructor2,
      yInstructor,
      xDateAwarded,
      yDateAwarded,
      xStudentId,
      yStudentId,
    };

  
    const formattedDate = dateAwarded.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  
    // Draw text on the page using the default Helvetica font
    page.setFont(openSansFont);
    page.drawText(fullName, { x: xName, y: coordinates.yFirstName, size: fontSize, font: openSansFont, color: rgb(0, 0, 0) });
    page.drawText(`${instructor1}`, { x: coordinates.xInstructor1, y: coordinates.yInstructor, size: 11, letterSpacing: 6, color: rgb(0, 0, 0) });
    page.drawText(`${instructor2}`, { x: coordinates.xInstructor2, y: coordinates.yInstructor, size: 11, letterSpacing: 6, color: rgb(0, 0, 0) });
    page.drawText(formattedDate, { x: coordinates.xDateAwarded, y: coordinates.yDateAwarded, fontSize: 18, color: rgb(0, 0, 0) });
    page.drawText(studentId, { x: coordinates.xStudentId, y: coordinates.yStudentId, fontSize: 24, color: rgb(0, 0, 0) });

  
    // Save the modified PDF
    const modifiedPdfBytes = await pdfDoc.save();
  
    // Create a Blob from the modified PDF bytes
    const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
  
    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'certificate.pdf';
    link.click();
  }

function Home() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickname, setNickname] = useState('');
  const [ageGroup, setAgeGroup] = useState('ADULT');
  const [beltAwarded, setBeltAwarded] = useState('WHITE');
  const [degreeAwarded, setDegreeAwarded] = useState('None');
  const [instructor1, setInstructor1] = useState('');
  const [instructor2, setInstructor2] = useState('');
  const [dateAwarded, setDateAwarded] = useState(new Date());
  const [studentId, setStudentId] = useState('');


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await generateCertificate(firstName, lastName, instructor1, instructor2, dateAwarded, studentId, ageGroup, beltAwarded, degreeAwarded);
  };

  return (
    <div className='w-full bg-slate pt-12 p-6 md:p-24 flex flex-col justify-center items-center' 
    style={{
        background: `url(${logo}) repeat`, // repeat the background image
        backgroundSize: '150px', // adjust this based on your design needs
        backgroundPosition: '20px 20px',
      }}>
         <div className='z-10 w-full lg:w-1/2 max-w-screen-sm mb-6 md:mb-12'>
          <h1 className='text-white font-bold text-4xl'>Hey <span className='text-yellow-500'>Deejay,</span><br /> Welcome Back</h1>
          <p className='text-white italic mt-2'>Enter a student&apos;s details down below to generate their belt certificate.</p>
        </div>
      <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-85'></div>
      <div className='z-10 w-full lg:w-1/2 max-w-screen-sm bg-black p-12 flex justify-center flex-col rounded-2xl border-1 border-white border shadow-md'>
       
        <div>
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <label className="text-white text-lg mt-2">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />

            <label className="text-white text-lg mt-2">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />

            <label className="text-white text-lg mt-2">Nickname <span className='text-xs'>(optional)</span></label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />

            <label className="text-white text-lg mt-8">Age Group</label>
            <div className="flex gap-4 mb-8">
              <label className="text-white">
                <input
                  type="radio"
                  value="ADULT"
                  checked={ageGroup === 'ADULT'}
                  onChange={() => setAgeGroup('ADULT')}
                  className="mr-2"
                />
                Adult
              </label>
              <label className="text-white">
                <input
                  type="radio"
                  value="YOUTH"
                  checked={ageGroup === 'YOUTH'}
                  onChange={() => setAgeGroup('YOUTH')}
                  className="mr-2"
                />
                Youth
              </label>
            </div>
            {ageGroup === 'ADULT' ? (
                <>
                    <label className="text-white text-lg mt-2">Belt Awarded</label>
                    <select
                        value={beltAwarded}
                        onChange={(e) => setBeltAwarded(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    >
                        <option value="WHITE">White</option>
                        <option value="BLUE">Blue</option>
                        <option value="PURPLE">Purple</option>
                        <option value="BROWN">Brown</option>
                        <option value="BLACK">Black</option>
                    </select>

                        <label className="text-white text-lg mt-2">Degree Awarded</label>
                        <select
                            value={degreeAwarded}
                            onChange={(e) => setDegreeAwarded(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        >
                            <option value="">None</option>
                            <option value="1st">1st</option>
                            <option value="2nd">2nd</option>
                            <option value="3rd">3rd</option>
                            <option value="4th">4th</option>
                        </select>
                </>
            ) : (
                <>
                    <label className="text-white text-lg mt-2">Belt Awarded</label>
                    <select
                        value={beltAwarded}
                        onChange={(e) => setBeltAwarded(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    >
                        <option value="WHITE">White</option>
                        <option value="GRAY">Gray</option>
                        <option value="YELLOW">Yellow</option>
                        <option value="ORANGE">Orange</option>
                        <option value="GREEN">Green</option>
                    </select>
                        <label className="text-white text-lg mt-2">Degree Awarded</label>
                        <select
                            value={degreeAwarded}
                            onChange={(e) => setDegreeAwarded(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        >
                            <option value="">None</option>
                            <option value="1st">1st</option>
                            <option value="2nd">2nd</option>
                            <option value="3rd">3rd</option>
                            <option value="4th">4th</option>
                            <option value="5th">5th</option>
                            <option value="6th">6th</option>
                            <option value="7th">7th</option>
                            <option value="8th">8th</option>
                        </select>
                </>
            )}

            <label className="text-white text-lg mt-2">Instructor 1</label>
            <input
              type="text"
              value={instructor1}
              onChange={(e) => setInstructor1(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <label className="text-white text-lg mt-2">Instructor 2</label>
            <input
              type="text"
              value={instructor2}
              onChange={(e) => setInstructor2(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <label className="text-white text-lg mt-2">Date Awarded</label>
            <DatePicker
            selected={dateAwarded}
            onChange={(date) => setDateAwarded(date)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />

            <label className="text-white text-lg mt-2">Student ID</label>
            <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <button
            type="submit"
            onClick={handleFormSubmit}
            className="bg-yellow-500 text-black font-bold text-lg px-8 py-2 mt-12 rounded hover:bg-white focus:outline-none"
            >
             Generate Certificate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
