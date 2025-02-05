import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { IoAdd } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser } from "../app/features/users/usersSlice.js";

export const AddEditUser = React.memo(({ mode, user, selectedRowKeys }) => {
    const [openAddNewUserModal, setOpenAddNewUserModal] = useState(false);
    const { barangays } = useSelector((store) => store.barangays);
    const { isUserFetchLoading } = useSelector((store) => store.users);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if (mode === "edit") {
            const initialValues = {
                username: user?.username || null,
                email: user?.email || null,
                password: null,
                role: user?.role || "resident",
                barangay_id: user?.barangay_id || null
            };
            form.setFieldsValue(initialValues);
        } else if (mode === "add") {
            const initialValues = {
                username: null,
                email: null,
                password: null,
                role: "resident",
                barangay_id: 1
            };
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();

        }
    }, [openAddNewUserModal, user?.key, mode, form, user?.username, user?.email, user?.role, user?.barangay_id]);

    const handleSubmit = (values) => {
        if (mode === "edit") {
            dispatch(editUser({
                id: user?.id,
                username: values.username,
                email: values.email,
                password: values.password,
                role: values.role,
                barangay_id: values.barangay_id
            })).then((payload) => {
                setOpenAddNewUserModal(false);
                form.resetFields();
            }).catch(() => {
                setOpenAddNewUserModal(true);
            });
        } else if (mode === "add") {
            dispatch(addUser({
                username: values.username,
                email: values.email,
                password: values.password,
                barangay_id: values.barangay_id,
                role: values.role
            })).then(() => {
                setOpenAddNewUserModal(false);
                form.resetFields();
            }).catch(() => setOpenAddNewUserModal(true));
        }

    };

    return (
        <>
            { mode === "add" ? (
                <Button onClick={ () => setOpenAddNewUserModal(!openAddNewUserModal) } type="default"
                        icon={ <IoAdd size={ 18 } className="text-white hover:text-cyan-500" /> }
                        className="bg-cyan-500 border-bg-cyan-500 border-0 hover:bg-cyan-300" />
            ) : (
                <button type="button" className="mr-3" onClick={ () => setOpenAddNewUserModal(!openAddNewUserModal) }>
                    <svg viewBox="0 0 1024 1024" className="icon w-5" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" fill="#000000">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                           strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M823.3 938.8H229.4c-71.6 0-129.8-58.2-129.8-129.8V215.1c0-71.6 58.2-129.8 129.8-129.8h297c23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.7 42.7h-297c-24.5 0-44.4 19.9-44.4 44.4V809c0 24.5 19.9 44.4 44.4 44.4h593.9c24.5 0 44.4-19.9 44.4-44.4V512c0-23.6 19.1-42.7 42.7-42.7s42.7 19.1 42.7 42.7v297c0 71.6-58.2 129.8-129.8 129.8z"
                                fill="#3688FF"></path>
                            <path
                                d="M483 756.5c-1.8 0-3.5-0.1-5.3-0.3l-134.5-16.8c-19.4-2.4-34.6-17.7-37-37l-16.8-134.5c-1.6-13.1 2.9-26.2 12.2-35.5l374.6-374.6c51.1-51.1 134.2-51.1 185.3 0l26.3 26.3c24.8 24.7 38.4 57.6 38.4 92.7 0 35-13.6 67.9-38.4 92.7L513.2 744c-8.1 8.1-19 12.5-30.2 12.5z m-96.3-97.7l80.8 10.1 359.8-359.8c8.6-8.6 13.4-20.1 13.4-32.3 0-12.2-4.8-23.7-13.4-32.3L801 218.2c-17.9-17.8-46.8-17.8-64.6 0L376.6 578l10.1 80.8z"
                                fill="#5F6379"></path>
                        </g>
                    </svg>
                </button>
            ) }

            <Modal title={ mode === "add" ? "Add New User" : "Edit User" } centered open={ openAddNewUserModal }
                   onOk={ () => setOpenAddNewUserModal(false) }
                   onCancel={ () => setOpenAddNewUserModal(false) } footer={ null } closeIcon={ null }>
                <div className="bg-transparent border-b-2 mb-2 pb-2 text-gray-800 text-xs md:text-sm">
                    { mode === "add" ? "Enter the user's information to add them to the system." : "Edit the user's" +
                        " information" }
                </div>
                {/*TODO: in edit mode, retain the values to be edited, otherwise in add mode, set it to default
                 initial values*/ }
                <Form form={ form } onFinish={ handleSubmit } layout="vertical"
                      onFinishFailed={ (val) => console.log(`${ mode === "add" ? "Add User Failed" : "Edit User Failed" }`, val) }>
                    <Row gutter={ 16 }>
                        <Col xs={ { flex: "100%" } } md={ { flex: "50%" } }>
                            <Form.Item
                                name="username"
                                label="Username"
                                rules={ [
                                    { required: true, message: "Username is required" }
                                ] }
                            >
                                <Input placeholder="Enter username" />
                            </Form.Item>
                        </Col>
                        <Col xs={ { flex: "100%" } } md={ { flex: "50%" } }>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={ [
                                    { required: true, message: "Email is required" },
                                    {
                                        type: "email",
                                        message: "Please enter a valid email"
                                    }
                                ] }
                            >
                                <Input placeholder="Enter email address" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={ 16 }>
                        <Col xs={ { flex: "100%" } } md={ { flex: "50%" } }>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={ mode === "add" && [
                                    { required: true, message: "Password is required" },
                                    {
                                        min: 6,
                                        message: "Password must be at least 6 characters",
                                        validateTrigger: ["onBlur", "onSubmit"]
                                    }
                                ] }
                            >
                                <Input.Password placeholder="Enter password" visibilityToggle="false" />
                            </Form.Item>
                        </Col>
                        <Col xs={ { flex: "100%" } } md={ { flex: "50%" } }>
                            <Form.Item
                                name="barangay_id"
                                label="Barangay"
                            >
                                <Select defaultValue={ mode === "add" ? barangays[0]?.id : null }>
                                    { barangays.map((barangay) => {
                                        return (
                                            <Select.Option key={ barangay?.id }
                                                           value={ barangay?.id }

                                            >
                                                { barangay?.name }
                                            </Select.Option>
                                        );
                                    }) }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={ 16 }>
                        <Col flex="1">
                            <Form.Item
                                name="role"
                                label="Role"
                            >
                                <Select options={ [
                                    { value: "assistant_admin", label: "Assistant Admin" },
                                    { value: "barangay", label: "Barangay" },
                                    { value: "resident", label: "Resident" }
                                ] } defaultValue={ mode === "add" ? "resident" : null } />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item className="flex justify-end">
                        <Button key="cancel" type="text" onClick={ () => setOpenAddNewUserModal(false) }
                                disabled={ isUserFetchLoading }
                                className="hover:border-red-700 hover:!text-red-700 hover:bg-none mr-2">
                            Cancel
                        </Button>
                        <Button key="submit" type="default" htmlType="submit" className="bg-cyan-600 text-white"
                                loading={ isUserFetchLoading }>
                            { mode === "add" ? "Submit" : "Save" }
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}, (prevProps, nextProps) => {
    return prevProps.mode === nextProps.mode && prevProps.user?.id === nextProps.user?.id;
});