import React, {useEffect} from 'react';
import $ from "jquery";
import moment from "moment";
import PieChart from "../components/D3Chart/PieChart";
import RadarChart from "../components/ReactChart/RadarChart";
import BarChart from "../components/ReactChart/BarChart";
import LineChart from "../components/ReactChart/LineChart";
import BarGraph from "../components/D3Chart/BarGraph";

interface IContainer {
    data: any;
}

const Container = ({data}: IContainer) => {

    let totalSpeedCount: number = 0;
    let totalDensityCount: number = 0;
    let totalHeightCount: number = 0;

    let totalSpeed: number = 0.00;
    let totalDensity: number = 0.00;
    let totalHeight: number = 0.00;

    let stackedData: any = [];

    for(let i in data) {
        if(data[i].sea_surface_wave_from_direction_at_variance_spectral_density_maximum) {
            totalDensityCount += 1
            totalDensity += data[i].sea_surface_wave_from_direction_at_variance_spectral_density_maximum
        }
        if(data[i].surface_sea_water_speed) {
            totalSpeedCount += 1
            totalSpeed += data[i].surface_sea_water_speed
        }
        if(data[i].sea_surface_wave_maximum_height) {
            totalHeightCount += 1
            totalHeight += data[i].sea_surface_wave_maximum_height
        }
        stackedData.push({
            name: moment(i).format('DD-MM-YYYY'),
            Speed: data[i].surface_sea_water_speed || 0,
            Density: data[i].sea_surface_wave_from_direction_at_variance_spectral_density_maximum,
            Height: data[i].sea_surface_wave_maximum_height
        })
    }

    let refactorSpeedDataD3: any = [
        { label: 'Water Speed', value: ((totalSpeed * 100) / totalSpeedCount)},
        { label: 'Spectral Density', value: ((totalDensity * 100) / totalDensityCount)},
        { label: 'Wave Maximum Height', value: ((totalHeight * 100) / totalHeightCount)}
    ];

    const refactorSpeedData: any = {};
    const refactorDensity: any = {};
    const refactorHeight: any = {};

    for(let i in data) {
        if (data[i].surface_sea_water_speed) {
            refactorSpeedData[moment(i).format('DD-MM-YYYY')] = data[i].surface_sea_water_speed
        }
        if (data[i].sea_surface_wave_from_direction_at_variance_spectral_density_maximum) {
            refactorDensity[moment(i).format('DD-MM-YYYY')] = data[i].sea_surface_wave_from_direction_at_variance_spectral_density_maximum
        }
        if (data[i].sea_surface_wave_maximum_height) {
            refactorHeight[moment(i).format('DD-MM-YYYY')] = data[i].sea_surface_wave_maximum_height
        }
    }

    useEffect(() => {
        // document.querySelector('#preloader').animate(500, );
        $('#preloader').fadeOut(500);
        $('#main-wrapper').addClass('show');

        $(".nav-control").on('click', function() {
            $('#main-wrapper').toggleClass("menu-toggle");
            $(".hamburger").toggleClass("is-active");
        });

        // function updateViewPort() {
        //     let viewportWidth: any = $(window).outerWidth();
        //
        //     if (viewportWidth < 768) {
        //         $("#main-wrapper").addClass("menu-toggle");
        //         $(".hamburger").addClass("is-active");
        //     }else {
        //         $("#main-wrapper").removeClass("menu-toggle");
        //         $(".hamburger").removeClass("is-active");
        //     }
        // }
        // updateViewPort();
        // $(window).resize(updateViewPort);

    },[])

    return (
        <div>
            <div id="preloader">
                <div className="loader">
                    <svg className="circular" viewBox="25 25 50 50">
                        <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="3"
                                stroke-miterlimit="10"/>
                    </svg>
                </div>
            </div>
            <div id="main-wrapper">
                <div className="nav-header">
                    <div className="brand-logo">
                        <a href="/">
                            <b className="logo-abbr">Met</b>
                            <span className="logo-compact">MetService</span>
                            <span className="brand-title">MetService</span>
                        </a>
                    </div>
                </div>
                <div className="header">
                    <div className="header-content clearfix">

                        <div className="nav-control">
                            <div className="hamburger">
                                <span className="toggle-icon"><i className="icon-menu"></i></span>
                            </div>
                        </div>
                        <div className="header-left">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="javascript:void(0)">Dashboard</a></li>
                                <li className="breadcrumb-item active"><a href="javascript:void(0)">Home</a></li>
                            </ol>
                        </div>
                        <div className="header-right">
                            <ul className="clearfix">
                                <li className="icons dropdown">
                                    <a href="javascript:void(0)" data-toggle="dropdown">
                                        <i className="icon-envelope"></i>
                                        <span className="badge badge-pill gradient-1">3</span>
                                    </a>
                                    <div className="drop-down dropdown-menu">
                                        <div className="dropdown-content-heading d-flex justify-content-between">
                                            <span className="">3 New Messages</span>
                                            <a href="javascript:void(0)" className="d-inline-block">
                                                <span className="badge badge-pill gradient-1">3</span>
                                            </a>
                                        </div>
                                        <div className="dropdown-content-body">
                                            <ul>
                                                <li className="notification-unread">
                                                    <a href="javascript:void(0)">
                                                        <img className="float-left mr-3 avatar-img"
                                                             src="images/user.png" alt="" />
                                                            <div className="notification-content">
                                                                <div className="notification-heading">
                                                                    Nikki.Baxter
                                                                </div>
                                                                <div className="notification-timestamp">
                                                                    08 Hours ago
                                                                </div>
                                                                <div className="notification-text">Hi Teddy, Just wanted
                                                                    to let you ...
                                                                </div>
                                                            </div>
                                                    </a>
                                                </li>
                                                <li className="notification-unread">
                                                    <a href="javascript:void(0)">
                                                        <img className="float-left mr-3 avatar-img"
                                                             src="images/user.png" alt="" />
                                                            <div className="notification-content">
                                                                <div className="notification-heading">James Boud</div>
                                                                <div className="notification-timestamp">08 Hours ago
                                                                </div>
                                                                <div className="notification-text">Can you do me a
                                                                    favour?
                                                                </div>
                                                            </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)">
                                                        <img className="float-left mr-3 avatar-img"
                                                             src="images/user.png" alt="" />
                                                            <div className="notification-content">
                                                                <div className="notification-heading">Barak Obama</div>
                                                                <div className="notification-timestamp">08 Hours ago
                                                                </div>
                                                                <div className="notification-text">Hi Teddy, Just wanted
                                                                    to let you ...
                                                                </div>
                                                            </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)">
                                                        <img className="float-left mr-3 avatar-img"
                                                             src="images/user.png" alt="" />
                                                            <div className="notification-content">
                                                                <div className="notification-heading">Hilari Clinton
                                                                </div>
                                                                <div className="notification-timestamp">08 Hours ago
                                                                </div>
                                                                <div className="notification-text">Hello</div>
                                                            </div>
                                                    </a>
                                                </li>
                                            </ul>

                                        </div>
                                    </div>
                                </li>
                                <li className="icons dropdown">
                                    <a href="javascript:void(0)" data-toggle="dropdown">
                                        <i className="icon-bell"></i>
                                        <span className="badge badge-pill gradient-2">3</span>
                                    </a>
                                    <div className="drop-down dropdown-menu dropdown-notfication">
                                        <div className="dropdown-content-heading d-flex justify-content-between">
                                            <span className="">2 New Notifications</span>
                                            <a href="javascript:void(0)" className="d-inline-block">
                                                <span className="badge badge-pill gradient-2">5</span>
                                            </a>
                                        </div>
                                        <div className="dropdown-content-body">
                                            <ul>
                                                <li>
                                                    <a href="javascript:void(0)">
                                                        <span className="mr-3 avatar-icon bg-success-lighten-2"><i
                                                            className="icon-present"></i></span>
                                                        <div className="notification-content">
                                                            <h6 className="notification-heading">Events near you</h6>
                                                            <span
                                                                className="notification-text">Within next 5 days</span>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)">
                                                        <span className="mr-3 avatar-icon bg-danger-lighten-2"><i
                                                            className="icon-present"></i></span>
                                                        <div className="notification-content">
                                                            <h6 className="notification-heading">Event Started</h6>
                                                            <span className="notification-text">One hour ago</span>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)">
                                                        <span className="mr-3 avatar-icon bg-success-lighten-2"><i
                                                            className="icon-present"></i></span>
                                                        <div className="notification-content">
                                                            <h6 className="notification-heading">Event Ended
                                                                Successfully</h6>
                                                            <span className="notification-text">One hour ago</span>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)">
                                                        <span className="mr-3 avatar-icon bg-danger-lighten-2"><i
                                                            className="icon-present"></i></span>
                                                        <div className="notification-content">
                                                            <h6 className="notification-heading">Events to Join</h6>
                                                            <span className="notification-text">After two days</span>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>

                                        </div>
                                    </div>
                                </li>
                                <li className="icons dropdown d-none d-md-flex">
                                    <a href="javascript:void(0)" className="log-user" data-toggle="dropdown">
                                        <span>English</span> <i className="icon-arrow-down" aria-hidden="true"></i>
                                    </a>
                                    <div className="drop-down dropdown-language dropdown-menu">
                                        <div className="dropdown-content-body">
                                            <ul>
                                                <li><a href="javascript:void(0)">English</a></li>
                                                <li><a href="javascript:void(0)">Dutch</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li className="icons dropdown">
                                    <div className="user-img position-relative" data-toggle="dropdown">
                                        <span className="user-name mr-3">Kumar</span>
                                        <span className="activity active"></span>
                                        <img className="img-fluid" src="images/user.png" height="40" width="40" alt="" />
                                    </div>
                                    <div className="drop-down dropdown-profile dropdown-menu">
                                        <div className="dropdown-content-body">
                                            <ul>
                                                <li><a href="#"><i className="icon-user"></i> <span>Profile</span></a>
                                                </li>
                                                <li><a href="#"><i className="icon-key"></i> <span>Logout</span></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="nk-sidebar">
                    <ul className="metismenu" id="menu">
                        <li>
                            <a href="#">
                                <i className="icon-speedometer menu-icon"></i><span
                                className="nav-text">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="icon-user menu-icon"></i><span className="nav-text">Customers</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="content-body">
                    <div className="container-fluid">
                        <div className="content-item">
                            <div className="row h-100">
                                <div className="col-12 col-sm-9">
                                    <div className="card">
                                        <div className="card-body">
                                            <BarChart data={refactorSpeedData} label={'surface sea water speed'} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-3">
                                    <div className="card">
                                        <div className="card-body align-self-center">
                                            <PieChart data={refactorSpeedDataD3}
                                                      width={200}
                                                      height={200}
                                                      innerRadius={0}
                                                      outerRadius={100} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="content-item">
                            <div className="row h-100">
                                <div className="col-12 col-sm-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <BarGraph data={stackedData} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="content-item">
                            <div className="row h-100">
                                <div className="col-12 col-sm-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <RadarChart data={refactorHeight} label={'wave maximum height'} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-9">
                                    <div className="card">
                                        <div className="card-body">
                                            <LineChart
                                                data={[refactorSpeedData, refactorDensity, refactorHeight]}
                                                label={['surface sea water speed', 'spectral density maximum', 'wave maximum height']} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/*<div className="content-item">*/}
                        {/*    <div className="row h-100">*/}
                        {/*        <div className="col-12 col-sm-4">*/}
                        {/*            <div className="card">*/}
                        {/*                <div className="card-body"></div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <div className="col-12 col-sm-8">*/}
                        {/*            <div className="card">*/}
                        {/*                <div className="card-body"></div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className="footer">
                    <div className="copyright">
                        <p>Copyright &copy; Designed & Developed by <a href="#">Kumar</a> 2021</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Container;
