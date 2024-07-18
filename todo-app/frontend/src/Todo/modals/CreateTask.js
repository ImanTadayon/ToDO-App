

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { statusList } from '../../data/constant';




const CreateTaskPopup = ({ modal, toggle, save }) => {
    // eslint-disable-next-line 
    const [taskId, setTaskId] = useState(''); // آی‌دی تسک جدید
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [due_date, setDue_date] = useState('');
    const [status, setStatus] = useState('');



    const resetForm = () => {
        setTitle('');
        setDescription('');
        setDue_date('');
        setStatus('');
    }



    const handleChange = (e) => {
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




    const handleSave = (e) => {
        e.preventDefault();


        if (!title || !description || !due_date || !status) {
            alert("نمیتواند خالی باشد")
            return;
        }


        let taskObj = {
            title: title,
            description: description,
            status: status,
            due_date: due_date
        };



        save(taskObj, (newTaskId) => {
            setTaskId(newTaskId); // ذخیره آی‌دی تسک جدید در وضعیت محلی
        });

        resetForm();
    }




    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Task</ModalHeader>
            <ModalBody>


                <div className="form-group">
                    <label>Task Name</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange} name="title" required />
                </div>


                <div className="form-group">
                    <label>Description</label>
                    <textarea rows="5" className="form-control" value={description} onChange={handleChange} name="description" required ></textarea>
                </div>


                <div className="form-group">
                    <label>Date</label>
                    <input type="date" className="form-control" value={due_date} onChange={handleChange} name="due_date" required ></input>
                </div>


                <label>Status</label>
                <div>
                    <select className="form-control" value={status} onChange={handleChange} style={{ color: 'rgba(128, 0, 128, 0.6)' }} name="status" required>
                        <option value="" disabled hidden>Select one</option>
                        {statusList.map((s) => {
                            return <option value={s.value} style={{ color: 'black' }} key={s.value}>{s.label}</option>
                        })}
                    </select>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSave}>Create</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};




export default CreateTaskPopup;
