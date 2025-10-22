
import type { AwardSection, AwardLevel } from './types';

export const AWARD_LEVELS: AwardLevel[] = [
  { name: 'Honorable Mention', minActivities: 4, maxActivities: 4, className: 'bg-green-100 text-green-800' },
  { name: 'Merit Award', minActivities: 5, maxActivities: 8, className: 'bg-blue-100 text-blue-800' },
  { name: 'Superior Merit Award', minActivities: 9, maxActivities: 12, className: 'bg-purple-100 text-purple-800' }
];

export const AWARD_DATA: AwardSection[] = [
  {
    title: 'Section 1: In Good Standing',
    description: 'Basic requirements for a student chapter to remain in good standing. All items are required.',
    isPrerequisite: true,
    categories: [
      {
        title: 'Required Prerequisites',
        requirements: [
          { id: '1.1', title: 'Minimum SHRM Members', description: 'Meet and maintain the minimum affiliation requirement of eight (8) national SHRM student members throughout the year.' },
          { id: '1.2', title: 'Annual SCIF Submission', description: 'Complete an annual Student Chapter Information Form (SCIF) and submit it to SHRM by June 1, to identify incoming chapter board leadership.' },
          { id: '1.3', title: 'Display SHRM "AFFILIATE OF" Logo', description: 'Correctly and consistently display the current SHRM "AFFILIATE OF” logo on website, chapter letterhead, banner, publications and products.' },
          { id: '1.4', title: 'Board & Educational Meetings', description: 'Hold a minimum of four (4) board meetings and a minimum of four (4) educational events that are organized and led by the student chapter.' },
          { id: '1.5', title: 'Membership Roster Updates', description: 'Submit any changes as they occur to our membership roster on the Student Chapter Roster Form, at least once during the merit award year.' },
        ],
      },
    ],
  },
  {
    title: 'Section 2A: Leadership & Operations',
    description: 'Demonstrates student chapter leadership and sound operational practices. All items are required for award consideration.',
    isPrerequisite: true,
    categories: [
      {
        title: 'Required Prerequisites',
        requirements: [
          { id: '2A.1', title: 'Board Operations Manual & Bylaws', description: 'Provide each board member with the SHRM Student Chapter Operations Manual and review the student chapter’s bylaws during at least one board meeting.' },
          { id: '2A.2', title: 'Chapter Operating Plan', description: 'Create and implement a student chapter operating plan for the award year, addressing programs, membership, and other activities.' },
          { id: '2A.3', title: 'Website or Social Media Presence', description: 'Create or maintain a student chapter website or social media account and include a hyperlink to SHRM\'s homepage (www.shrm.org).' },
        ],
      },
    ],
  },
  {
    title: 'Section 2B: Merit Award Activities',
    description: 'Complete activities to earn award recognition. The number of completed activities determines the award level.',
    isPrerequisite: false,
    categories: [
      {
        title: 'Chapter Programming & Career Development',
        requirements: [
          { id: '2B.1', title: 'HRM Workshop/Seminar', description: 'Plan and implement a one-hour human resource management-related workshop, seminar or conference event.' },
          { id: '2B.2', title: 'Attend External Professional Event', description: 'Student chapter members will attend an external professional workshop, seminar or conference event on HRM and share information with the membership.' },
          { id: '2B.3', title: 'Membership Marketing Plan', description: 'Implement a membership marketing plan for the acquisition of SHRM Student members in our chapter.' },
          { id: '2B.4', title: 'Promote Internships/Mentorships', description: 'Members participate in internships, mentorships, company visits, job shadow opportunities; OR the chapter promotes job openings to all members.' },
        ],
      },
      {
        title: 'Community-Based Activities',
        requirements: [
          { id: '2B.5', title: 'Publish Newsletter or Article', description: 'Publish a student chapter newsletter in print/electronic format OR submit an article about advancing the HR profession.' },
          { id: '2B.6', title: 'Promote HR Profession', description: 'Participate in a campus career fair to promote awareness of the HR profession to non-HR majors OR coordinate a career fair for high/middle school.' },
          { id: '2B.7', title: 'Fundraising Plan', description: 'Create and implement a fundraising plan for the student chapter, detailing the types of activities to be undertaken.' },
          { id: '2B.8', title: 'Community & Public Policy Project', description: 'Plan and implement a project that supports the community and promotes public-policy advocacy.' },
        ],
      },
      {
        title: 'SHRM Affiliate Support',
        requirements: [
          { id: '2B.9', title: 'Promote Student-to-Professional Program', description: 'Promote the SHRM Student-to-Professional Membership Program to graduating SHRM student members.' },
          { id: '2B.10', title: 'Educate on SHRM BASK', description: 'Educate student chapter members on the SHRM Body of Applied Skills and Knowledge® (SHRM BASK®) and promote its benefits.' },
          { id: '2B.11', title: 'Promote SHRM-CP Certification', description: 'Promote the benefits and value of the SHRM Certified Professional (SHRM-CP®) certification and encourage eligible members to prepare and sit for the exam.' },
          { id: '2B.12', title: 'Support SHRM Foundation', description: 'Promote the SHRM Foundation\'s programs by contributing $25 from the chapter\'s funds and promoting its programs to members.' },
        ],
      },
    ],
  },
];
