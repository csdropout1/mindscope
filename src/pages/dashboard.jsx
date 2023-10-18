// import Image from 'next/image';
// import { Georama } from 'next/font/google';
// import styles from '@/styles/Home.module.css';
// import Toolbars from '../components/subpages/toolbar';
// import Dashboard from './patientportal';

// import { useRouter } from 'next/router';
// import { useCallback } from 'react';
// import { Button } from '@mui/material';

// const geo = Georama({ subsets: ['latin'] });

// export default function Home() {
//   const router = useRouter();
//   const onLogin = useCallback(() => {
//     router.push('/login');
//   }, [router]);

//   return (
//     <div>
//       <Toolbars />
//       <main className={styles.main}>
//         <div className={styles.spacing}></div>
//         <div className={styles.center}>
//           <Image
//             src="/Mindscope (3).png"
//             alt="Next.js Logo"
//             width={452}
//             height={153}
//             priority
//           />
//         </div>
//         <div className={styles.thirteen}>Telehealth, run by data.</div>

//         <div className={styles.spacing}></div>
//         <div className={styles.spacing}></div>

//         <div className={styles.grid}>
//           <Button onClick={onLogin} >
//             <a
//             className={styles.card}
//             >
//               <h2 className={geo.className}>
//                 Log In <span>-&gt;</span>
//               </h2>
//               <p className={geo.className}>
//                 Sign up and log in today to improve your workflow!
//               </p>
//             </a>
//           </Button>

//           <a
//             href="./phq9p"
//             className={styles.card}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <h2 className={geo.className}>
//               Forms and Calls <span>-&gt;</span>
//             </h2>
//             <p className={geo.className}>
//               Video calling, data collecting, and form filling - all in one
//               platform!
//             </p>
//           </a>

//           <Dashboard />

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <h2 className={geo.className}>
//               Privacy and HIPAA Policies <span>-&gt;</span>
//             </h2>
//             <p className={geo.className}>
//               NPCA will not be liable for any misuse of data. Please familiarize
//               yourself with your state laws and Ferderal HIPAA regulations and
//               obtain patient consent before using our services.
//             </p>
//           </a>
//         </div>

//         <div className={styles.spacing}></div>
//         <div className={styles.spacing}></div>
//       </main>
//     </div>
//   );
// }

export default function Dashboard() {
  return 'Dashboard';
}
