import React from 'react'
import logo from "../../images/logo.png"

function About() {
    return (
        <div>
            <img style={{height: '400px'}} alt="Music test" src={logo}/>
            <h1>DIDA - HỆ THỐNG PHÂN PHỐI DỮ LIỆU</h1>
            <p>Dida (Data Distribution) là hệ thống phân phối dữ liệu được phát triển dựa trên nền tảng công nghệ<br/>
            Blockchain. Qua đó đạt được các tính minh bạch và an ninh và quan trọng nhất là trao quyền kiểm soát dữ<br/>
            người dùng. Ngoài ra hệ thống còn có các tính năng giúp người dùng kiếm tiền như tìm dữ liệu hộ, bán dữ <br/>
            liệu cá nhân</p>
        </div>
    )
}

export default About