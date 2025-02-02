import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { OrganizationChartModule } from 'primeng/organizationchart';

@Component({
  selector: 'app-pathway',
  imports: [OrganizationChartModule, CommonModule, ButtonModule, CardModule],
  standalone: true,
  templateUrl: './pathway.component.html',
  styleUrl: './pathway.component.css',
})
export class PathwayComponent {
  data: any[] = [
    {
      label: 'Basic Programming',
      data: {
        description: 'Learn fundamental programming concepts and basic syntax.',
      },
      children: [
        {
          label: 'Python Basics',
          data: {
            description:
              'Learn the basic concepts of Python programming language.',
          },
          children: [
            {
              label: 'Variables & Data Types',
              data: {
                description:
                  'Learn about different data types in Python and how to work with variables.',
              },
            },
            {
              label: 'Control Structures',
              data: {
                description:
                  'Learn about loops, conditionals, and basic program flow in Python.',
              },
            },
            {
              label: 'Functions & Modules',
              data: {
                description:
                  'Learn how to write reusable functions and modules in Python.',
              },
            },
          ],
        },
        {
          label: 'JavaScript Basics',
          data: {
            description:
              'Start with JavaScript fundamentals for web development.',
          },
          children: [
            {
              label: 'Variables & Functions',
              data: {
                description:
                  'Learn about JavaScript variables, data types, and functions.',
              },
            },
            {
              label: 'Loops & Conditions',
              data: {
                description:
                  'Learn how to handle loops and conditions in JavaScript.',
              },
            },
          ],
        },
      ],
    },
    {
      label: 'Web Development',
      data: {
        description: 'Learn to build dynamic websites and web applications.',
      },
      children: [
        {
          label: 'Front-End Development',
          data: {
            description:
              'Learn HTML, CSS, JavaScript, and frameworks like React or Angular.',
          },
          children: [
            {
              label: 'HTML & CSS Basics',
              data: {
                description:
                  'Learn how to create basic static webpages using HTML and CSS.',
              },
            },
            {
              label: 'Responsive Design',
              data: {
                description:
                  'Learn how to make websites responsive on any device using media queries.',
              },
            },
            {
              label: 'JavaScript & DOM Manipulation',
              data: {
                description:
                  'Learn how JavaScript interacts with the DOM to build dynamic pages.',
              },
              children: [
                {
                  label: 'Event Handling',
                  data: {
                    description:
                      'Learn how to handle events like clicks and form submissions in JavaScript.',
                  },
                },
                {
                  label: 'AJAX & Fetch API',
                  data: {
                    description:
                      'Learn how to make HTTP requests to load data asynchronously in web applications.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Back-End Development',
          data: {
            description:
              'Learn server-side technologies such as Node.js, Python, and databases.',
          },
          children: [
            {
              label: 'Node.js Basics',
              data: {
                description:
                  'Learn about the Node.js runtime environment for server-side programming.',
              },
              children: [
                {
                  label: 'Express.js Framework',
                  data: {
                    description:
                      'Learn how to build APIs with Express.js, a web framework for Node.js.',
                  },
                },
                {
                  label: 'Database Integration',
                  data: {
                    description:
                      'Learn to integrate databases like MongoDB or MySQL into your server applications.',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'Cloud Computing',
      data: {
        description:
          'Learn cloud platforms like AWS, Google Cloud, or Microsoft Azure for scalable applications.',
      },
      children: [
        {
          label: 'AWS Certified Solutions Architect',
          data: {
            description:
              'Learn how to design and deploy systems using Amazon Web Services (AWS).',
          },
          children: [
            {
              label: 'Cloud Services Overview',
              data: {
                description:
                  'Get an overview of AWS services and how they work together for scalable solutions.',
              },
            },
            {
              label: 'EC2 and S3',
              data: {
                description:
                  'Learn to deploy and manage instances (EC2) and storage (S3) in AWS.',
              },
            },
          ],
        },
      ],
    },
  ];

  // Example function to dynamically add a new skill or competency at a given level
  addSkill(parentNode: any, newSkill: any) {
    if (!parentNode.children) {
      parentNode.children = [];
    }
    parentNode.children.push(newSkill);
  }

  // Define the sectors and their descriptions
  pathways: any[] = [
    {
      label: 'Information and Communication Technology (ICT)',
      description:
        'Pathways for skills development in the ICT sector, including programming, web development, and cybersecurity.',
    },
    {
      label: 'Health and Social Care',
      description:
        'Learn skills for healthcare and social services, including patient care, healthcare management, and more.',
    },
    {
      label: 'Construction and Infrastructure',
      description:
        'Develop skills in construction, project management, and infrastructure planning and development.',
    },
    {
      label: 'Agriculture and Fisheries',
      description:
        'Gain knowledge and skills in agriculture, farming, fisheries management, and sustainable practices.',
    },
    {
      label: 'Tourism and Hospitality',
      description:
        'Explore career opportunities in tourism, guiding, hotel management, and hospitality services.',
    },
    {
      label: 'Manufacturing and Logistics',
      description:
        'Skills for the manufacturing and logistics sectors, including production, warehousing, and supply chain management.',
    },
    {
      label: 'Business and Finance',
      description:
        'Build skills in business management, financial analysis, entrepreneurship, and corporate operations.',
    },
  ];

  // Function to handle "Explore Pathways" button click
  onExplorePathway(pathway: any) {
    console.log(`Exploring pathways for: ${pathway.label}`);
    // You can navigate to another page or show a detailed view of the selected pathway
  }
}
