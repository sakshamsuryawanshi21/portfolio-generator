// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Home: React.FC = () => {
//   const navigate = useNavigate();

//   const handleTemplateSelect = (template: string) => {
//     localStorage.setItem('selectedTemplate', template); // save template selection
//     navigate('/form'); // go to form page
//   };

//   return (
//     <div style={{ padding: '2rem', textAlign: 'center' }}>
//       <h1 style={{ marginBottom: '2rem' }}>Choose Your Portfolio Template</h1>

//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         gap: '2rem',
//         flexWrap: 'wrap'
//       }}>
//         {/* Template 1 */}
//         <div
//           onClick={() => handleTemplateSelect('template1')}
//           style={{
//             border: '2px solid black',
//             padding: '1rem',
//             width: '250px',
//             cursor: 'pointer',
//             borderRadius: '8px'
//           }}
//         >
//           <h3>🧩 Template 1</h3>
//           <p>Simple, Clean Layout</p>
//         </div>

//         {/* Template 2 */}
//         <div
//           onClick={() => handleTemplateSelect('template2')}
//           style={{
//             border: '2px solid black',
//             padding: '1rem',
//             width: '250px',
//             cursor: 'pointer',
//             borderRadius: '8px'
//           }}
//         >
//           <h3>🎨 Template 2</h3>
//           <p>Bold & Visual Layout</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
export {};

