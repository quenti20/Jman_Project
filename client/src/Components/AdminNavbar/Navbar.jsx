import React, { useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import ChangePassword from '../../Pages/Auth/ChangePassword/ChangePassword';
import { useContext } from 'react';
import { NavContext } from '../../Pages/Auth/AdminDashboard/AdminDashboard';
import RegisterButton from '../../Components/AddTrainerButton/AddTrainerbutton';

export default function NavBar() {
    const { isHome, setIsHome, isEmployeePlan, setIsEmployeePlan, isInternPlan, setIsInternPlan, isUpload, setIsUpload } = useContext(NavContext);
    const overlayRef = useRef(null);
    const token = sessionStorage.getItem('token');
    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
        </a>
    );

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => {
                localStorage.setItem('isHome', true);
                localStorage.setItem('isEmployeePlan', false);
                localStorage.setItem('isInternPlan', false);
                localStorage.setItem('isUpload', false);
                setIsHome(true);
                setIsEmployeePlan(false);
                setIsInternPlan(false);
                setIsUpload(false);
            }
        },
        {
            label: 'Employee Plan',
            icon: 'pi pi-calendar',
            command: () => {
                localStorage.setItem('isHome', false);
                localStorage.setItem('isEmployeePlan', true);
                localStorage.setItem('isInternPlan', false);
                localStorage.setItem('isUpload', false);
                setIsHome(false);
                setIsEmployeePlan(true);
                setIsInternPlan(false);
                setIsUpload(false);
            }
        },
        {
            label: 'Intern Plan',
            icon: 'pi pi-users',
            command: () => {
                localStorage.setItem('isHome', false);
                localStorage.setItem('isEmployeePlan', false);
                localStorage.setItem('isInternPlan', true);
                localStorage.setItem('isUpload', false);
                setIsHome(false);
                setIsEmployeePlan(false);
                setIsInternPlan(true);
                setIsUpload(false);
            }
        },
        {
            label: 'Upload Results',
            icon: 'pi pi-upload',
            command: () => {
                localStorage.setItem('isHome', false);
                localStorage.setItem('isEmployeePlan', false);
                localStorage.setItem('isInternPlan', false);
                localStorage.setItem('isUpload', true);
                setIsHome(false);
                setIsEmployeePlan(false);
                setIsInternPlan(false);
                setIsUpload(true);
            }
        }
    ];

    const dropdownItems = [
        { label: 'Register', icon: 'pi-user-plus'},
        { label: 'Change Password', icon: 'pi pi-key' },
        { label: 'Logout', icon: 'pi pi-sign-out',url:'/' }    
    ];

    const showOverlay = (event) => {
        overlayRef.current.toggle(event);
    };
    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const menuItems = items.map((item, index) => ({
        label: item.label,
        icon: item.icon,
        command: item.command
    }));
    return (
        <div className="card">
            <Menubar model={menuItems} start={start} end={
                <div className="menubar">
                    <Button className="p-button-text" onClick={showOverlay}>
                        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                    </Button>
                    <OverlayPanel style={{width:'17rem'}} ref={overlayRef} appendTo={document.body}>
                        {dropdownItems.map((item, index) => (
                            <a key={index} style={{display:'flex',flexDirection:'column'}}>
                                {item.label === 'Change Password' ? <ChangePassword token={token} /> : item.label === 'Register' ? <RegisterButton/> : <a href={item.url}><Button label={item.label} icon={item.icon} className="p-button-text" ></Button></a>}
                            </a>
                        ))}
                    </OverlayPanel>
                </div>
              } 
            />
        </div>
    );
}
