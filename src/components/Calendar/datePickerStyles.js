import styled from 'styled-components';

import { Form, Dropdown } from 'react-bootstrap';

export const DatePickerContainer = styled.div`
  position: relative;
`;

export const DatePickerFormGroup = styled(Form.Group)`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  border: 2px solid #06c;
  border-radius: 5px;
  overflow: hidden;
`;

export const DatePickerLabel = styled(Form.Label)`
  margin: 0;
  padding: 0 2rem;
  font-weight: 600;
  font-size: 0.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #06c;
  border-right: 2px solid #06c;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 102, 204, 0.05);
`;

export const DatePickerInput = styled(Form.Control)`
  padding: 1rem 2rem;
  font-weight: 500;
  font-size: 1rem;
  color: #333;
  box-shadow: none;
  border: none;
  text-align: center;
  letter-spacing: 1px;
  background: transparent !important;
  display: flex;
  align-items: center;

  ::placeholder {
    color: #999;
    font-size: 0.9rem;
  }
`;

export const DatePickerDropdown = styled(Dropdown)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export const DatePickerDropdownToggle = styled(Dropdown.Toggle)`
  position: relative;
  width: 100%;
  height: 100%;
  background: transparent;
  opacity: 0;
  filter: alpha(opacity=0);
`;

export const DatePickerDropdownMenu = styled(Dropdown.Menu)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border: none;
  padding: 0;
  margin: 0;
  transform: none !important;
`;
