import { useState } from 'react';

const validateDate = (value: string): string => {
  if (value.length < 8) return '날짜를 8자리로 입력해 주세요 (YYYYMMDD)';
  const year = parseInt(value.slice(0, 4));
  const month = parseInt(value.slice(4, 6));
  const day = parseInt(value.slice(6, 8));
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    return '유효하지 않은 날짜에요.';
  }
  return '';
};

export const useCreateGenerationForm = () => {
  const [form, setForm] = useState({
    generationName: '',
    startDate: '',
    endDate: '',
    inviteCode: '',
  });
  const [dateErrors, setDateErrors] = useState({ startDate: '', endDate: '' });

  const isFormValid =
    form.generationName.trim() !== '' &&
    form.startDate.length === 8 &&
    !validateDate(form.startDate) &&
    form.endDate.length === 8 &&
    !validateDate(form.endDate) &&
    form.inviteCode.trim() !== '';

  const normalize = (field: keyof typeof form, value: string): string => {
    if (field === 'generationName') return value.replace(/\D/g, '');
    if (field === 'startDate' || field === 'endDate') return value.replace(/\D/g, '').slice(0, 8);
    return value;
  };

  const handleChange = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: normalize(field, value) }));

  const validateDateField = (field: 'startDate' | 'endDate', value: string) => {
    const error = validateDate(value);
    setDateErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  const clearDateError = (field: 'startDate' | 'endDate') =>
    setDateErrors((prev) => ({ ...prev, [field]: '' }));

  return {
    form,
    dateErrors,
    isFormValid,
    handleChange,
    validateDateField,
    clearDateError,
  };
};
