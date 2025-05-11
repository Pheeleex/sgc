import React from 'react'

interface PageProps {
    params: Promise<{
      section: string;
    }>;
  }

const page = async (props: PageProps) => {
  const params = await props.params;
  const { section } = params;
  console.log(section); // This will log the section parameter to the console
  return (
    <div>
      This is {section} page
    </div>
  )
}

export default page
