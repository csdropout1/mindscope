import styles from '@/styles/Home.module.css';
import { KeyedQuestionSet } from '@/types/questions';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material';
import { Box } from '@mui/system';

export const FormLayout = ({
  onSubmit,
  currentQuestionSet,
  answers,
  subtitle
}: {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  currentQuestionSet: KeyedQuestionSet | null;
  answers: { id: string; answer: string }[];
  subtitle: string;
}) => {
  const answerMap = new Map<string, string>();
  answers.forEach((answer) => answerMap.set(answer.id, answer.answer));
  return (
    <Box
      sx={{
        marginTop: '5%',
        marginLeft: '4%',
        backgroundColor: 'white',
        marginRight: '4%'
      }}
    >
      <Box component="form" onSubmit={onSubmit} sx={{ paddingTop: '1%' }}>
        <div className={styles.questionheading2}>
          {' '}
          {currentQuestionSet == null ? '' : currentQuestionSet.name}
        </div>
        <div className={styles.questionheading2}>
          {' '}
          {subtitle == null ? '' : subtitle}
        </div>
        <div className={styles.questionheading2}>
          {currentQuestionSet == null ? '' : currentQuestionSet.prompt}
        </div>
        {currentQuestionSet == null
          ? ''
          : currentQuestionSet.questions.map((question) => {
              let valueProps = {};
              if (answerMap.has(question.key)) {
                valueProps = { value: answerMap.get(question.key) };
              }

              return (
                <div key={question.key}>
                  <div className={styles.questions}>{question.question}</div>
                  <FormControl required fullWidth>
                    <InputLabel id="demo-simple-select-label" required>
                      Answer
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name={question.key}
                      label="Answer"
                      defaultValue={''}
                      disabled={answerMap.has(question.key)}
                      {...valueProps}
                    >
                      {question.responses.map((response, index) => (
                        <MenuItem key={response} value={index}>
                          {response}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              );
            })}
        {answers.length == 0 && (
          <Box
            sx={{ display: 'flex', justifyContent: 'center', marginLeft: -7 }}
          >
            <Button type="submit" className={styles.submit}>
              Submit
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
