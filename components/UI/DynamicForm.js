import { Form, Formik } from "formik";
import Button from "./Button";
import DynamicFormFields, { getInitialValues, getValidations } from "./DynamicFormFields";
import { HighlightedText } from "./TextComponents";
import * as yup from 'yup';

const DynamicForm = ({ onSubmit, fields, isLoading, error }) => {
  const initialVals = getInitialValues(fields);
  const validations = yup.object(getValidations(fields));

  // ================================================================================================
  //  UI
  // ================================================================================================
  return (
    <Formik initialValues={initialVals} validationSchema={validations} onSubmit={onSubmit}>
      {({ values }) =>
        <Form>
          <DynamicFormFields fields={fields} values={values} />

          {error && <HighlightedText type="error">{error}</HighlightedText>}

          <Button type="submit" isLoading={isLoading}>Submit</Button>
        </Form>
      }
    </Formik>
  );
}

export default DynamicForm;