import { ISection } from 'components/Form';
import {
  Container,
  StyledInput,
  InputLabel,
  Toggle,
  ToggleContainer,
} from './styles';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  name?: string;
  description?: string;
  error?: boolean;
  valid?: boolean;
  type?: string;
  containerStyle?: any;
  span?: number;
  stateValues?: any;
  setStateValues?: (values: any) => void;
  required?: boolean;
  toggleOptions?: [string, string];
  bool?: boolean;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  section?: ISection;
  index?: number;
}

const Input: React.FC<IInputProps> = ({
  title = 'Placeholder',
  name = '',
  description = '',
  error = false,
  valid = false,
  type = 'text',
  containerStyle = {},
  span = 1,
  stateValues = {},
  setStateValues = (values: any) => {
    return;
  },
  required = false,
  toggleOptions = ['', ''],
  bool = false,
  section = {},
  index,
  ...rest
}) => {
  const containerProps = {
    style: containerStyle,
    error,
    span,
    toggle: toggleOptions.length > 0,
  };

  const correctType = (value: string, prevValue: string | number) => {
    switch (type) {
      case 'number':
        return Number(value);
      case 'date':
        return new Date(value).getTime();
      case 'checkbox':
        return bool ? !prevValue : Number(!prevValue);
      case 'text':
      default:
        return value;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const prevValue = stateValues[name];

    const setPath = (object: any, path: string, value: any) => {
      path
        .split('.')
        .reduce(
          (obj, pth, index: number) =>
            (obj[pth] =
              path.split('.').length === ++index ? value : obj[pth] || {}),
          object,
        );
    };

    const resolvePath = (object: any, path: string, defaultValue?: any) => {
      const pathArray = path.split('.');

      return pathArray.reduce(
        (obj, pth) => (obj ? obj[pth] : defaultValue),
        object,
      );
    };

    if (section.title && !section.inner) {
      const sectionValues = { ...stateValues[section.title] };
      sectionValues[name] = correctType(e.target.value, prevValue);
      stateValues = {
        ...stateValues,
        [section.title.replace(/\s/g, '')]: sectionValues,
      };
    } else if (section.title && section.inner && section.innerPath) {
      const sectionValues = { ...stateValues };

      const innerValue = resolvePath(sectionValues, section.innerPath, {});

      innerValue[name] = correctType(e.target.value, prevValue);

      setPath(sectionValues, section.innerPath, innerValue);
    } else {
      stateValues = {
        ...stateValues,
        [e.target.name]: correctType(e.target.value, prevValue),
      };
    }
  };
  const inputProps = {
    placeholder: title,
    error,
    valid,
    name,
    type,
    required,
    onChange: handleChange,
    ...rest,
  };

  return (
    <Container {...containerProps}>
      {type === 'checkbox' ? (
        <>
          <InputLabel>{title}</InputLabel>

          <ToggleContainer>
            {toggleOptions.length > 1 && toggleOptions[0]}
            <Toggle>
              <StyledInput {...inputProps} required={false} />
              <div className="slider"></div>
              {error && <span>{description}</span>}
            </Toggle>
            {toggleOptions.length > 1 && toggleOptions[1]}
          </ToggleContainer>
        </>
      ) : (
        <>
          <StyledInput {...inputProps} />
          <InputLabel>{title}</InputLabel>
          {error && <span>{description}</span>}
        </>
      )}
    </Container>
  );
};

export default Input;
