export type formDataType = {
    [key: string]: FormDataEntryValue | number;
};

const getFormDate = (form: HTMLFormElement) => {
    const formData = new FormData(form);

    const data: formDataType = {};

    for (const [key, value] of formData) {
        data[key] = value;
    }

    return data;
};

export default getFormDate;
