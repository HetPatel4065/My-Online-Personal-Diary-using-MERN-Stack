import React from 'react'

export default function Alert(props) {
    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    
    return (
        <>
            {props.alert && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className={`modal-content border-${props.alert.type === 'success' ? 'success' : props.alert.type === 'danger' ? 'danger' : props.alert.type === 'warning' ? 'warning' : 'primary'}`}>
                            <div className={`modal-header bg-${props.alert.type === 'success' ? 'success' : props.alert.type === 'danger' ? 'danger' : props.alert.type === 'warning' ? 'warning' : 'primary'} text-white`}>
                                <h5 className="modal-title">
                                    <i className={`fa-solid fa-${props.alert.type === 'success' ? 'check-circle' : props.alert.type === 'danger' ? 'exclamation-triangle' : props.alert.type === 'warning' ? 'exclamation-circle' : 'info-circle'}`}></i>
                                    {' '}{capitalize(props.alert.type)}
                                </h5>
                            </div>
                            <div className="modal-body text-center">
                                <h5 className="mb-0">{props.alert.msg}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}