

import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { statusList } from '../../data/constant';
// import axios from 'axios'




const EditTaskPopup = ({ modal, toggle, taskObj, updateListArray }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [due_date, setDue_date] = useState('');
    const [status, setStatus] = useState('');



    const handleChange = async (e) => {
        const { name, value } = e.target;

        if (name === "title") {
            setTitle(value);
        } else if (name === "status") {
            setStatus(value);
        } else if (name === "due_date") {
            setDue_date(value);
        } else {
            setDescription(value);
        }
    }



    useEffect(() => {
        setTitle(taskObj.title);
        setDescription(taskObj.description);
        setDue_date(taskObj.due_date);
        setStatus(taskObj.status);
    }, [taskObj.title, taskObj.description, taskObj.due_date, taskObj.status]);




    const handleUpdate = async (e) => {
        e.preventDefault();
        let tempObj = {
            id: taskObj.id,
            title: title,
            description: description,
            due_date: due_date,
            status: status
        };

        updateListArray(tempObj);

    }



    return (
        <Modal isOpen={modal} toggle={toggle}>


            <ModalHeader toggle={toggle}>Update Task</ModalHeader>


            <ModalBody>


                <div className="form-group">
                    <label>Task Name</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange} name="title" />
                </div>


                <div className="form-group">
                    <label>Description</label>
                    <textarea rows="5" className="form-control" value={description} onChange={handleChange} name="description"></textarea>
                </div>


                <div className="form-group">
                    <label>Date</label>
                    <input type="date" className="form-control" value={due_date} onChange={handleChange} name="due_date" />
                </div>


                <label>Status</label>
                <div>
                    <select className="form-control" value={status} onChange={handleChange} style={{ color: 'rgba(128, 0, 128, 0.6)' }} name="status">
                        <option value="" disabled hidden>Select one</option>
                        {statusList.map((s) => (
                            <option key={s.value} value={s.value} style={{ color: 'black' }}>
                                {s.label}
                            </option>
                        ))}
                    </select>
                </div>


            </ModalBody>


            <ModalFooter>


                <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>

            </ModalFooter>
        </Modal>
    );
};

export default EditTaskPopup;


