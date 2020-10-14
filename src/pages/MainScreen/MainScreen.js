import React, { useEffect, useState } from 'react'

import { Spin, Progress, Table, Space, Modal, Button, Popconfirm, message, Popover } from 'antd';
import 'antd/dist/antd.css';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/auth';
import { getfiles, uploadfile, deleteFile, modFile, refreshfiles } from '../../actions/files';
import { startLoadingtable } from '../../actions/ui'
//const { Header, Content, Footer } = Layout;
import { useForm } from '../../hooks/useForm';



export const MainScreen = () => {
    const [nuevonombre, nuevosetNombre] = useState("");
    const [itemid, setItemid] = useState(0);

    const spinningmod = useSelector(state => state.ui.spinningmod);
    const spinningdelete = useSelector(state => state.ui.spinningdelete);
    const username = useSelector(state => state.auth.user);
    const ssetitemid = (id) => {
        setItemid(id);
    }
    const changefile = (e) => {
        e.preventDefault();
        console.log("CHANGEEEE:: " + itemid);
        dispatch(modFile(itemid, nuevonombre, username));
    }
    const content = (
        <div className="formwrap3">

            <div className="formcontent2">
                <form className="form3" onSubmit={changefile}>

                    <label className="formlabel2" htmlFor="for">Nombre</label>
                    <h6>incluir extension porfavor!!!</h6>
                    <input
                        className="forminput2"
                        name="nuevonombre"
                        value={nuevonombre}
                        onChange={(e) => { nuevosetNombre(e.target.value) }}


                    >
                    </input>




                    <button
                        type="submit"
                        className="formbutton2"
                        disabled={spinningmod}

                    >Modificar</button>

                </form>
            </div>
        </div>
    );

    const deleteconf = (e) => {
        console.log("VOY A BORRAR:: ", e);
        ssetitemid(e);
        setTimeout(() => {
            console.log("..");
            console.log("VOY A BORRAR:: ", itemid);
            dispatch(deleteFile(itemid))
        }, 1000);

    }
    const deletecancel = (e) => {
        console.log("NOOOOO:: ", e);
        setItemid(e);
    }
    const modconf = (e) => {
        console.log("VOY A MODIFICAR:: ", e);
        setItemid(e);
    }
    const modcancel = (e) => {
        console.log("NOOOOO MODIFICAR:: ", e);
        setItemid(e);
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },

        /* {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        }, */
        {
            title: 'Action',
            key: 'id',
            render: (item) => (
                <Space size="middle">

                    <Popconfirm
                        title="Seguro que quieres eliminar este archivo?"
                        onConfirm={() => deleteconf(item.id)}
                        onCancel={() => deletecancel(item.id)}
                        okText="Si"
                        cancelText="No"
                    >

                        <Button onClick={() => ssetitemid(item.id)} value={item.id} type="danger" loading={spinningdelete && item.id == itemid} >
                            Eliminar
                        </Button>
                    </Popconfirm>
                    <Spin spinning={spinningmod} delay={500}>
                        <Popover content={content} trigger="click">
                            <Button type="primary" onClick={() => ssetitemid(item.id)}>Modificar</Button>
                        </Popover>
                    </Spin>

                    <a href={item.path}>Descargar</a>
                </Space>
            ),

        },
    ];
    const [visible, setVisible] = useState(false);


    const [nombre, setNombre] = useState("");
    const [file, setFile] = useState(null);

    const data = useSelector(state => state.file.files);
    const loadingtable = useSelector(state => state.ui.loadingtable);
    const user = useSelector(state => state.auth.user);
    const progress = useSelector(state => state.ui.progress);
    const porcentaje = useSelector(state => state.ui.porcentaje);
    const dispatch = useDispatch();
    const upload = (e) => {
        e.preventDefault();
        console.log(e.target)
        const files = e.target.files;
        const formData = new FormData()
        formData.append('nombre', nombre);
        formData.append('file', file);
        dispatch(uploadfile(formData, user));
        /* let url = `http://back:5000/api/v1/files/${user}`;
        fetch(url, {
            method: 'POST',

            //headers: {'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' },
            body: formData
        })
            .then(response => {
                console.log("RESPONSE::");
                console.log(response);

            })
             .then(response => response.json()) 
             .then(data => {
                    console.log(data)
                }) 
            .catch(error => {
                console.error(error)
            }) */
    }

    const outlog = () => {
        dispatch(logout());
    }
    const openmodal1 = () => {
        setVisible(true);
    }
    const closemodal1 = () => {
        setVisible(false);
    }

    useEffect(() => {
        console.log("USE EFFECTTTT!!!")
        dispatch(refreshfiles([]));
        dispatch(startLoadingtable());
        dispatch(getfiles(user));

        return () => {
            console.log("..clean")
        }
    }, [])

    return (
        <>

            <Modal
                visible={visible}
                title="Crea un nuevo Archivo"

                onCancel={closemodal1}
                footer={[
                    <Button key="back" onClick={closemodal1}>
                        Return
            </Button>,
                    ,
                ]}
            >
                <div className="formwrap2">
                    <a className="icon2">Sube un Archivo</a>
                    <div className="formcontent2">
                        <form className="form2" onSubmit={upload}>
                            <h1 className="formh12">Ingresa</h1>
                            <label className="formlabel2" htmlFor="for">Nombre</label>
                            <input
                                className="forminput2"
                                name="nombre"
                                value={nombre}
                                onChange={(e) => { setNombre(e.target.value) }}
                            >
                            </input>



                            <label className="formlabel2" htmlFor="for">Archivo</label>
                            <input
                                className="forminput2"
                                name="file"
                                type="file" id="fileUpload"
                                onChange={(e) => { setFile(e.target.files[0]) }}
                            >

                            </input>
                            <button
                                type="submit"
                                className="formbutton2"
                                disabled={progress}

                            >Crear-Archivo</button>


                        </form>
                        {(progress && <Progress percent={porcentaje} />)}
                    </div>
                </div>
            </Modal>
            <nav className="navv">
                <div className="navbarcontainer">
                    <span className="navlogo">FS-DRIVE</span>

                </div>
                <h3 className="h3user">{username}</h3>
                <span className="navbtnlink" onClick={outlog}>Logout</span>
            </nav>




            <div className="contenedor">

                <div className="divopciones">
                    <Button type="primary" onClick={openmodal1}>+</Button>
                </div>
                <div className="divtable">
                    <Table loading={loadingtable} columns={columns} dataSource={data} />
                </div>



            </div>


        </>
    )
}
