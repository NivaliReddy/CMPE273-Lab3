import React from 'react'
import { Form, Container, Row, Col, Button, Image, ListGroup, Modal } from "react-bootstrap";

const images = [
    "https://www.lemonblossoms.com/wp-content/uploads/2018/07/Chicken-Shawarma-Recipe-S5.jpg",
    "https://images-gmi-pmc.edge-generalmills.com/5d4933c9-8abf-461a-bfbf-65eedeb990b3.jpg",
    "https://static01.nyt.com/images/2018/11/27/dining/as-one-pot-beans/as-one-pot-beans-articleLarge.jpg",
    "https://cleobuttera.com/wp-content/uploads/2018/03/lifted-baklava.jpg",
    "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2020/05/21/BX1803__fried-chicken-sandwiches_s4x3.jpg.rend.hgtvcom.826.620.suffix/1590083550520.jpeg",
    "https://cdn3.tmbi.com/toh/GoogleImages/Southern-Fried-Chicken-with-Gravy_exps33285_THRAA2874593C01_23_1b_RMS.jpg",
    "https://hips.hearstapps.com/delish/assets/17/36/1504715566-delish-fettuccine-alfredo.jpg",
    "https://media.vogue.in/wp-content/uploads/2020/08/chole-bhature-recipe-1366x768.jpg",
    "https://www.thespruceeats.com/thmb/3CSORjFsgqkA7AY6XMguUlsmyCM=/5101x2869/smart/filters:no_upscale()/GettyImages-639389404-5c450e724cedfd00015b09d5.jpg",
    "https://www.roughguides.com/wp-content/uploads/2014/12/Edited-9-Dosa-CXHGB4.jpg",
    "https://thumbor.thedailymeal.com/RD4wRbXWH39G0X24ZCgKStNV6iA=/870x565/https://www.thedailymeal.com/sites/default/files/slideshows/2022427/2199623/13.jpg",
    "https://theblackhorsefindon.co.uk/wp-content/uploads/2020/02/chinese-625_625x350_81466064119.jpg",
    "https://images.squarespace-cdn.com/content/v1/5a53ae322278e7169a744c59/1556575937878-TCF1PV4W9DBQN3E8W4JK/ke17ZwdGBToddI8pDm48kGB1Vu1IO5PKLGYtbkYEbFcUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYwL8IeDg6_3B-BRuF4nNrNcQkVuAT7tdErd0wQFEGFSnBV-E9i2EVqde5Cb9xE3BFT0Y0y81fgQTRF5_KQn2Dt-hnH6vQz70q521Loj74v26g/iStock-523044922hortcrop.jpg",
    "https://www.thespruceeats.com/thmb/1QoEFkpjZh0U2pxIociGJhzxDTY=/2723x2042/smart/filters:no_upscale()/easy-chocolate-ice-cream-recipe-1945798-hero-01-45d9f26a0aaf4c1dba38d7e0a2ab51e2.jpg",
    "https://cdn.tasteatlas.com/images/dishes/5291b5f2fcee42849cd84a03bff55e0a.jpg?w=600&h=450",
    "https://www.thedailymeal.com/sites/default/files/2019/11/18/Hero_classic_desserts_dreamstime.jpg",
    "https://cdn.cnn.com/cnnnext/dam/assets/181128174108-07-50-sweets-travel-chocolate-chip-cookies.jpg",
    "https://goboldwithbutter.com/BoldWithButter/media/recipe_images/Imported/best-buttermilk-pancakes.jpg?ext=.jpg"
]

const Menu = (props) => {
    let menu = props.menu;

    return (
        <div>
            <Row>
                    <Col md={4}>
                        <Image src={images[props.index]} fluid style={{height:"200px",width:"100%"}}></Image>
                    </Col>
                    <Col md={8}>
                        <Row>
                            <Container>
                                <Row>
                                    <Col md="12">

                                        <h4 style={{ color: "#1a8cff" }}> {menu.dishName}</h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="auto">
                                        <b> Main Ingredients:</b>
                                    </Col>
                                    <Col md="auto">
                                        <Row></Row>
                                        <p>{menu.mainIngredients}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <Row>
                                            <Col md="auto" style={{paddingRight:"0"}}>Price : </Col>

                                        <Col md="auto" style={{padding:"0"}}>
                                            <p style={{marginLeft:"10px"}}>{menu.price}$</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <p>{menu.description}</p>
                                    </Col>
                                </Row>
                            </Container>
                        </Row>

                    </Col>

            </Row>
            <hr></hr>
        </div>
    )
}

export default Menu;