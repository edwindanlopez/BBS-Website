import * as Yup from 'yup';
import {
  phoneRegExp,
  characterLimit,
} from '../components/shared/FormFieldComponents';

const contactPageValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  contactMethod: Yup.string().required('Required'),
  subject: Yup.string()
    // specify the set of valid values for job type
    // @see http://bit.ly/yup-mixed-oneOf
    .oneOf(
      ['General Contact', 'Estimate', 'Question/Other'],
      'Invalid Job Type'
    )
    .required('Required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Invalid phone number')
    .required('Required'),
  email: Yup.string().email('Invalid email addresss').required('Required'),
  message: Yup.string()
    .max(characterLimit, `Must be ${characterLimit} characters or less`)
    .required('Required'),
  city: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
});

const homePageFormSchema = Yup.object({
  fullName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  email: Yup.string().email('Invalid email addresss').required('Required'),
  message: Yup.string()
    .max(characterLimit, `Must be ${characterLimit} characters or less`)
    .required('Required'),
});

export { contactPageValidationSchema, homePageFormSchema };
