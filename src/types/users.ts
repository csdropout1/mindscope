export type UUID = string;

export type Patient = {
  name: string;
};

export type KeyedPatient = {
  id: string;
  name: string;
};

export type Provider = {
  email: string;
  patients: string[];
};
