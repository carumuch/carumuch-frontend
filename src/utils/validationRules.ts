const validationRules = {
  email: [
    {
      validate: (value: string) => value.trim() !== '',
      errorMessage: 'Email is required.',
    },
    {
      validate: (value: string) => /\S+@\S+\.\S+/.test(value),
      errorMessage: 'Invalid email format.',
    },
  ],
  name: [
    {
      validate: (value: string) => value.trim() !== '',
      errorMessage: 'Name is required.',
    },
  ],
  phoneNumber: [
    {
      validate: (value: string) => value.trim() !== '',
      errorMessage: 'Phone number is required.',
    },
    {
      validate: (value: string) => /^010-\d{3,4}-\d{4}$/.test(value),
      errorMessage: 'Phone number must be in the format 010-1234-5678.',
    },
  ],
};

export default validationRules;
