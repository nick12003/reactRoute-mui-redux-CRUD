import { useEffect } from "react";
import { Link, useLoaderData, useParams, redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, FastField } from "formik";
import * as yup from "yup";
import {
  Container,
  Box,
  Typography,
  ButtonGroup,
  Button,
  FormControl,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";

import { editAction } from "../redux/edit";

const validSchema = yup.object().shape({
  title: yup.string().required(),
});

const { fetchOne, createOne, updateOne, resetData } = editAction;

const EditPage = ({ pageEdit }) => {
  const { id } = useParams();
  // const loaderData = useLoaderData();
  const { data, newId } = useSelector((state) => state.edit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetData());
    if (pageEdit) {
      dispatch(fetchOne({ id }));
    }
  }, []);

  const handleSave = (values) => {
    if (pageEdit) {
      dispatch(updateOne({ id, data: values }));
    } else {
      dispatch(createOne({ data: values }));
      redirect("/");
    }
  };

  return (
    <Container style={{ padding: "2rem" /* height: "100vh" */ }}>
      <Formik
        enableReinitialize
        initialValues={data}
        validationSchema={validSchema}
        onSubmit={handleSave}
      >
        {({ submitForm, initialValues, setFieldValue }) => (
          <Box display='flex' flexDirection='column' height='100%'>
            <Box display='flex' justifyContent='center' flex=' 0 0 auto'>
              <Typography variant='h3'>{pageEdit ? initialValues.title : "New page"}</Typography>
            </Box>
            <Box display='flex' flex=' 1 0 auto' padding='2rem' flexDirection='column'>
              <FastField name='title'>
                {({ field, meta: { touched, error } }) => (
                  <TextField
                    id='title'
                    onChange={(e) => {
                      setFieldValue("title", e.target.value);
                    }}
                    required
                    error={!!touched && !!error}
                    value={field.value}
                    label='title'
                  />
                )}
              </FastField>

              <FormControl component='fieldset' variant='standard'>
                <FormControlLabel
                  control={
                    <FastField name='completed'>
                      {({ field }) => (
                        <Switch
                          checked={field.value}
                          onChange={(e) => {
                            setFieldValue("completed", e.target.checked);
                          }}
                        />
                      )}
                    </FastField>
                  }
                  label='completed'
                />
              </FormControl>
            </Box>
            <Box display='flex' justifyContent='center' flex=' 0 0 auto' marginTop='2rem'>
              <ButtonGroup variant='contained' aria-label='outlined primary button group'>
                <Button variant='outlined'>
                  <Link to='/' style={{ color: "unset", textDecoration: "none" }}>
                    back
                  </Link>
                </Button>
                <Button onClick={submitForm}>save</Button>
              </ButtonGroup>
            </Box>
          </Box>
        )}
      </Formik>
    </Container>
  );
};

export default EditPage;
