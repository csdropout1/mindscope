import { AppBar, Toolbar } from '@mui/material';
import Image from 'next/image';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Image
          src="/Mindscope (3).png"
          alt="Mindscope logo"
          width={226}
          height={76.5}
        />
      </Toolbar>
    </AppBar>
  );
}
