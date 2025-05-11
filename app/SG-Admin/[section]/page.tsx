import React from 'react'

interface PageProps {
    params: {
      section: string;
    };
  }

const page = ({params}: PageProps) => {
    const { section } = params;
    console.log(section); // This will log the section parameter to the console
  return (
    <div>
      This is {section} page
    </div>
  )
}

export default page
