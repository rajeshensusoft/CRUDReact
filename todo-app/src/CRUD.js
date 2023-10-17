import React , { useState,useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


let  CRUD = () =>{
  let  [show, setShow] = useState(false);
  let  handleClose = () => setShow(false);
  let  handleShow = () => setShow(true);
  let [name,setName]= useState('')
  let [age,setAge]= useState('')
  let [isActive,setIsActive]= useState(0)

  let [editId,setEditId] = useState('')
  let [editname,setEditName]= useState('')
  let [editage,setEditAge]= useState('')
  let [editIsActive,setEditIsActive]= useState(0)

  let  empdata =[
        {
            id:1,
            name:'Manoj',
            age :29,
            isActive :1
        },
        {
            id:2,
            name:'Virat',
            age :30,
            isActive :1
        },
        {
            id:3,
            name:'Rohit',
            age :34,
            isActive :0
        },
    ]
    let [data, setData]= useState([]);
    useEffect(()=>{
      getData();
    })

    let  getData = () =>
   {
    axios.get('https://localhost:7096/api/Employee')
    .then((result)=>{
      setData(result.data)
    })
    .catch((error)=> {
      console.log(error)
    })
   }

   let  handleEdit=(id) =>{
        
        handleShow();
        axios.get(`https://localhost:7096/api/Employee/${id}`)
        .then((result)=>{
          setEditName(result.data.name);
          setEditAge(result.data.age);
          setEditIsActive(result.data.isActive);
          setEditId(id);
         })
         .catch((error)=>{
          toast.error(error);
         })
    }

    let  handleDelete=(id) =>{
        if(window.confirm("Are you sure to delete this Employee") == true)
        {
           axios.delete(`https://localhost:7096/api/Employee/${id}`)
           .then((result)=>{
            if(result.status===200)
            {
              toast.success('Employee has been deleted')
            }
           })
           .catch((error)=>{
            toast.error(error);
           })
        }
             
    }

    let  handeleSave=() =>
    {
      let  url='https://localhost:7096/api/Employee'
      let  data={
        
        "name": name,
        "age": age,
        "isActive":isActive
      }
      axios.post(url,data)
      .then((result)=>{
        getData();
        clear();
        toast.success('Employee has been added');
      })
      .catch((error)=>{
        toast.error(error);
       })
    }
    let  clear =() =>{
      setName('');
      setAge('');
      setIsActive(0);
      setEditName('');
      setEditAge('');
      setEditIsActive(0);
      setEditId('');

    }

    let  handleActiveChange=(e) =>{
    if(e.target.checked)
    {
      setIsActive(1)
    }
    else{
      setIsActive(0)
    }
   }
   let   handleEditActiveChange=(e) =>{
    if(e.target.checked)
    {
      setEditIsActive(1)
    }
    else{
      setEditIsActive(0)
    }
   }
   let  handleUpdate=() =>
    {
      const url=`https://localhost:7096/api/Employee/${editId}`
      const data={
        "id":editId,
        "name":editname,
        "age":editage,
        "isActive": editIsActive
        
      }
      axios.put(url,data)
      .then((result) =>{
        handleClose();
        getData();
        clear();
        toast.success('Employee has been Updated')
      }).catch((error)=>{
        toast.error(error);
      })
    }
        return(
        <Fragment>
          <ToastContainer />
      <Container>
      <Row>
        <Col>
        <input type="text" className="form-control" placeholder="Enter Name"
        value={name} onChange={(e)=> setName(e.target.value)}
        />
        </Col>
        <Col>
        <input type="text" className="form-control" placeholder="Age"
        value={age} onChange={(e)=> setAge(e.target.value)}
        />
        </Col>
        <Col>
        <input type="checkbox"
        checked={isActive === 1 ? true : false}
        onChange={(e) => handleActiveChange(e)} value={isActive}
        />
        <label>IsActive</label>
        </Col>
        <Col>
        <Button className="btn btn-primary" onClick={()=>handeleSave()}>Submit</Button>
        </Col>
      </Row>
    </Container>
         <Table striped bordered hover>
      <thead  style={{border:"2px solid black"}}>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Age</th>
          <th>IsActive</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
            data && data.length > 0 ?
            data.map((item,index) =>{
                return(
                    <tr key={index}>
                    <td>{index+ 1}</td>  
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.isActive}</td>
                    <td colSpan={2}>
                        <button className="btn btn-primary" onClick={()=> handleEdit(item.id)}>Edit</button> &nbsp;
                        <button className="btn btn-danger" onClick={()=> handleDelete(item.id)}>Delete</button>
                    </td>
                    </tr>
                )
            })
            :
            'Loading'
        }
      </tbody>
    </Table>
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify / Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
        <Col>
        <input type="text" className="form-control" placeholder="Enter Name"
        value={editname} onChange={(e)=> setEditName(e.target.value)}
        />
        </Col>
        <Col>
        <input type="text" className="form-control" placeholder="Age"
        value={editage} onChange={(e)=> setEditAge(e.target.value)}
        />
        </Col>
        <Col>
        <input type="checkbox"
        checked={editIsActive === 1 ? true : false}
        onChange={(e) => handleEditActiveChange(e)} value={editIsActive}
        />
        <label>IsActive</label>
        </Col>
      </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

        </Fragment>
    )
}

export default CRUD;