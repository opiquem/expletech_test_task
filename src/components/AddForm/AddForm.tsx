import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { buttonCreateFormStyles } from '../../styles/styles';
import styles from './AddForm.module.scss';

const addPostShema = yup.object().shape({
  title: yup.string()
    .min(2, 'Too Short!')
    .required('Post Title is required!'),
  body: yup.string()
    .min(2, 'Too Short!')
    .required('Body is required'),
});

type Props = {
  onAddPost: (postTitle: string, postBody: string) => void,
  handleModalToggle: () => void,
}

export const AddForm: React.FC<Props> = ({ onAddPost, handleModalToggle }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
    },
    validationSchema: addPostShema,
    onSubmit: (values) => {
      onAddPost(values.title, values.body)
    }
  },
  );

  return (
    <form onSubmit={formik.handleSubmit} className={styles.addForm}>
      <div className={styles.addForm__inputs}>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          sx={{ width: '100%' }}
        />

        <TextField
          fullWidth
          id="body"
          name="body"
          label="Body"
          value={formik.values.body}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.body && Boolean(formik.errors.body)}
          helperText={formik.touched.body && formik.errors.body}
          sx={{ width: '100%'}}
        />
      </div>

      <div className={styles.addForm__buttons}>
        <Button
          sx={buttonCreateFormStyles}
          type="submit"
        >
          Add
        </Button>

        <Button sx={buttonCreateFormStyles}
          onClick={handleModalToggle}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
