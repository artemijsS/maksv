import React, { useState } from "react";
import style from './select.module.scss'

interface Option {
    option: string,
    value: string
}

interface SelectProps {
    options: Option[],
    placeHolder: string,
    onSelect: (value: string) => void,
    disabled?: boolean
}

const Select = ({ options, placeHolder, onSelect, disabled }: SelectProps) => {

    const [ value, setValue ] = useState<Option>({option: placeHolder, value: ''})
    const [ isOpen, setIsOpen ] = useState<boolean>(false)

    const selectOption = (opt: Option) => {
        setValue(opt);
        console.log(opt.value)
        onSelect(opt.value);
    }

    const openOptions = () => {
        if (!disabled)
            setIsOpen(!isOpen);
    }

    return (
        <div className={style.select + " " + (disabled ? style.disabled : "")} onClick={() => openOptions()}>
            <div className={style.visiblePart}>
                <div className={style.placeholder}>{value.option}</div>
                <svg className={style.selectSVG + " " + (isOpen ? style.rotate : "")} width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.50781 0.25L0.75 1.05859L7 7.75L13.25 1.05859L12.4961 0.25L7 6.12891L1.50781 0.25Z" fill="#3C3C3C"/>
                </svg>
            </div>
            {isOpen &&
                <div className={style.options}>
                    <div className={style.option} onClick={() => selectOption({option: placeHolder, value: ''})}>{placeHolder}</div>
                    {options.map((option, i) => (
                        <div onClick={() => selectOption(option)} className={style.option} key={i}>{option.option}</div>
                    ))

                    }
                </div>
            }
        </div>
    )
}

export default Select;
