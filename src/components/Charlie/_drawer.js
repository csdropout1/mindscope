import * as React from 'react';
import { useState } from 'react';
import { Drawer, Button } from '@mui/material/';
import DailyCall from '@/components/Charlie/_test';

const Drawers = () => {
  const [anchor, set] = useState(null);
  const open = (event) => {
    set(event.currentTarget);
  };
  const close = () => {
    set(null);
  };

  return (
    <>
      <Button onClick={open}>OPEN</Button>
      <Drawer
        anchor="left"
        open={Boolean(anchor)}
        onClose={close}
        PaperProps={{
          sx: {
            marginTop: '100px',
            backgroundColor: 'grey',
            color: 'white',
            flexGrow: 1,
            width: '720'
          }
        }}
      >
        Hi
        <DailyCall />
      </Drawer>
    </>
  );
};
export default Drawers;

//Use this on the page
//import DailyCall from "@/components/active/_test";
//import Drawers from "@/components/active/_drawer";

//Use in return portion
//                <Drawers object={<DailyCall/>}/>

//npm install @daily-co/daily-js
