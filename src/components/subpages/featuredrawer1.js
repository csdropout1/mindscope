import styles from '@/styles/Home.module.css';
import * as React from 'react';
import {
  List,
  Box,
  Link,
  ListItem,
  Button,
  ListItemText
} from '@mui/material/';
import VideocamIcon from '@mui/icons-material/Videocam';

const Featuredrawer1 = () => {
  //make a hashmap

  return (
    <Box sx={{ marginTop: 7, marginLeft: 7 }}>
      <div className={styles.mainheading}>
        PHQ - 9 &nbsp;&nbsp;
        <VideocamIcon />
      </div>

      <div className={styles.questionheading}>
        Over the last 2 weeks, how often have you been bothered by any of the
        following problems?
      </div>

      <List>
        <ListItem className={styles.questions}>
          {' '}
          Q1 - Little interest or pleasure in doing things
        </ListItem>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            0 - Not at all{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            1 - Several days{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            2 - More than half the days{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            3 - Nearly every day{' '}
          </ListItemText>
        </Link>
      </List>
      <List>
        <ListItem className={styles.questions}>
          {' '}
          Q2 - Feeling down, depressed, or hopeless
        </ListItem>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            0 - Not at all{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            1 - Several days{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            2 - More than half the days{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            3 - Nearly every day{' '}
          </ListItemText>
        </Link>
      </List>
      <List>
        <ListItem className={styles.questions}>
          {' '}
          Q3 - Trouble falling or staying asleep, or sleeping too much
        </ListItem>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            0 - Not at all{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            1 - Several days{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            2 - More than half the days{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            3 - Nearly every day{' '}
          </ListItemText>
        </Link>
      </List>
      <List>
        <ListItem className={styles.questions}>
          {' '}
          Q4 - Feeling tired or having little energy
        </ListItem>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            0 - Not at all{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            1 - Several days{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            2 - More than half the days{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            3 - Nearly every day{' '}
          </ListItemText>
        </Link>
      </List>
      <List>
        <ListItem className={styles.questions}>
          {' '}
          Q5 - Poor appetite or overeating{' '}
        </ListItem>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            0 - Not at all{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            1 - Several days{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            2 - More than half the days{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            3 - Nearly every day{' '}
          </ListItemText>
        </Link>
      </List>
      <List>
        <ListItem className={styles.questions}>
          {' '}
          Q6 - Feeling bad about yourself — or that you are a failure or have
          let yourself or your family down{' '}
        </ListItem>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            0 - Not at all{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            1 - Several days{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            2 - More than half the days{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            3 - Nearly every day{' '}
          </ListItemText>
        </Link>
      </List>
      <List>
        <ListItem className={styles.questions}>
          {' '}
          Q7 - Trouble concentrating on things, such as reading the newspaper or
          watching television
        </ListItem>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            0 - Not at all{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            1 - Several days{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            2 - More than half the days{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            3 - Nearly every day{' '}
          </ListItemText>
        </Link>
      </List>
      <List>
        <ListItem className={styles.questions}>
          {' '}
          Q8 - Moving or speaking so slowly that other people could have
          noticed? Or the opposite — being so fidgety or restless that you have
          been moving around a lot more than usual{' '}
        </ListItem>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            0 - Not at all{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            1 - Several days{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            2 - More than half the days{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            3 - Nearly every day{' '}
          </ListItemText>
        </Link>
      </List>
      <List>
        <ListItem className={styles.questions}>
          {' '}
          Q9 - Thoughts that you would be better off dead or of hurting yourself
          in some way{' '}
        </ListItem>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            0 - Not at all{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            1 - Several days{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            2 - More than half the days{' '}
          </ListItemText>
        </Link>
        <Link underline="hover" sx={{ color: 'white' }}>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: '18px', textTransform: 'none', marginLeft: '5%' }
            }}
          >
            3 - Nearly every day{' '}
          </ListItemText>
        </Link>
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginLeft: -7 }}>
        <Button className={styles.submit}>Submit</Button>
      </Box>
    </Box>
  );
};
export default Featuredrawer1;
