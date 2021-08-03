import React from 'react';
import { FormikCheckButton, FormikSelect, FormikTextField } from './FormFields';
import Spacing from './Spacing';

const DynamicFormFields = ({ fields, values = {} }) => {

  /**
   * RETURN A SELECT FIELD
   */
  const getFormikSelectField = ({ options, defaultValue, ...formProps }, name, key) => {
    return (
      <FormikSelect key={key} name={name} {...formProps}>
        {Object.entries(options).map(([text, val]) => <option key={val + key} value={val}>{text}</option>)}
      </FormikSelect>
    );
  }

  /**
   * GET FORMIK FIELD
   */
  const getFormikField = ({ defaultValue, ...formProps }, name, key) => {
    return (
      <FormikTextField key={key} name={name} {...formProps} />
    )
  }

  /**
   * GET FORMIK CHECK FIELD
   */
  const getFormikCheckField = ({ defaultValue, ...formProps }, name, key) => {
    return (
      <div key={key}>
        <FormikCheckButton key={key} name={name} checked={values[name]} {...formProps} type="checkbox" />
        <Spacing padding="10px" />
      </div>
    )
  }

  /**
   * MAP THE FIELDS TO WIDGETS
   */
  const formFields = Object.entries(fields).map(
    ([name, field], ind) => {
      switch (field.type) {
        case "select":
          return getFormikSelectField(field, name, ind);
        case "check":
          return getFormikCheckField(field, name, ind)
        default:
          return getFormikField(field, name, ind);
      }
    }
  );

  // ================================================================================================
  //  UI
  // ================================================================================================
  return (<div className="DynamicFormFields"> {formFields} </div>);
};

export default DynamicFormFields;

/**
 * GET THE INTIIALVALUES
 */
export const getInitialValues = (fields) => {
  let initialValues = {};
  Object.entries(fields).forEach(
    ([name, field]) => {
      initialValues[name] = field.defaultValue || "";
    }
  );
  return initialValues;
}

/**
 * GET VALIDATIONS
 */
export const getValidations = (fields) => {
  let validations = {};
  Object.entries(fields).forEach(
    ([name, field]) => {
      if (field.validation) validations[name] = field.validation;
    }
  );
  return validations;
}