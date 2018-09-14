import React from 'react';

const ItemShowSubitem = (subItem) => {

    const { subitem } = subItem;

    return subitem
        ? subitem.map((sub)=>{
            return( 
            <li key={sub._id}>
                <p>id : {sub._id}</p>
                <p>title : {sub.title}</p>
            <p>text : {sub.text}</p>
            </li>
            )
        })
        : <span>Loading</span>

        return JSON.stringify(subItem);
}

export default ItemShowSubitem;