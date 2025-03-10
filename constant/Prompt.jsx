import dedent from "dedent";

export default {
  IDEA: dedent`:As your are coaching teacher
- User want to learn about the topic
-Generate 5-7 Course title for study (Short)
-Make sure it is releated to description
- Output will be ARRAY of String in JSON FORMAT only
-Do not add any plain text in output,`,

  COURSE: dedent`: As you are coaching teacher
- User want to learn about all topics
- Create 2 Courses with Course Name, Description, and 3 Chapters in each course
- Make Sure to add chapters with all learning material courses wise
- Add CourseBanner Image from ('/banner1.png','/banner2.png', '/banner3.png', '/banner4.png')
- Explain the chapter content as detailed tutorial
- Generate 5 Quiz, 10 Flashcard and 5 Questions answer
- Tag each course to one of the category from : ["Tech & Coding", "Business & Finance","Health & Fitness", "Arts & Creativity"]

- Output in JSON Format only
- "courses" : [
{
  "courseTitle" : '<Intro to Python>',
  "description" : '',
  "banner_image": "/banner1.png",
  "category" : ''
  "chapters" : [
     {
	chapterName : '',
	content : [
		  {
		    topic : '<Topic Name in 2 to 4 words ex.(Creating Variables )>'	,
		    explain : '<Detailed Explanation tutorial>',
		    code : '<Code example of required else null>',
		    example : '<example of required else null>'
		   }
		]
	}
  ],

 "quiz" : [
	  {
	    question : '',
            options: ['a',b,c,d],
	    correctAns : ''	
          }
          ],
flashcards : [
            {
		front : '',
		back: ''	
	}
            ],
 qa: [
     {
     questions : '',
     answer : ''
     }
     ]
}
]`,
};
