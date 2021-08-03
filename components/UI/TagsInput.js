import React,{useState} from 'react';
import theme from '../../config/theme';

/**
* THE TAG FORM
*/
const TagsInput = ({ initialTags, label, onChange, maxTags, error }) => {
  const [tags, setTags] = useState(initialTags || []);
  const inputBorderBottom = (tags.length > 0) ? `1px solid ${theme.colors.borderColor}` : "none";

  //
  // Delete Tag
  //
  const onDelete = (tagID) =>{
    const newTags = tags.filter((e, i) => i !== tagID);
    setTags(newTags);

    if (onChange) onChange(newTags);
  }

  //
  // Add Tag
  //
  const onAdd = val => {
    let newTags = tags;
    if (val !== "") newTags = [...tags, val];
    setTags(newTags);

    if (onChange) onChange(newTags);
  }

  //
  // Add Tag on enter press
  //
  const checkAndAdd = e => {
    const { keyCode, target: { value } } = e;
    if (keyCode !== 13 && keyCode !== 188) return;
    onAdd(value.replace(/,/g, ''));  
    e.target.value = "";    
  }

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="TagsInput">
      <h4>{label || "Tags"}</h4>

      <div className="tagsForm">
        <input 
          type="text" 
          onKeyDown={checkAndAdd} 
          onKeyUp={e => {if(e.target.value === ",") e.target.value = ""}}
          placeholder="Enter tags (separated by comma)"
          disabled={tags.length === maxTags}
        />

        {(tags.length > 0) && 
          <div className="tagsList">
            {tags.map((item,index) => <Tag key={index} id={index} value={item} onDelete={onDelete}/>)}
          </div>
        }
      </div>

      {error && <h5>{error}</h5>}

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        h4 {
          margin: 12px 0;
          font-size: 0.9rem;
          margin-left: 5px;
        }

        .tagsForm {
          border: 1px solid ${theme.colors.borderColor};
          border-radius: 5px;
          margin-bottom: 12px;
          overflow: hidden;
        }

        .TagsInput input{
          border: none;
          border-radius: 0;
          width: 100%;
          background: #fff;
          border-bottom: ${inputBorderBottom};
        }

        .tagsList{
          padding: 10px;
          display:flex;
          align-items:center;
          flex-wrap: wrap;
        }

        .emptyMessage{
          flex-grow: 1;
          margin: 10px;
          font-weight: bold;
          color: ${theme.colors.lightText};
        }

        .TagsInput :global(.Tag) {
          background: #fff;
          box-shadow: 0 1px 2px rgba(0,0,0,0.15);
          display:flex;
          align-items:center;
          padding: 5px;
          border-radius: 3px;
          font-size: 0.9em;
          margin:3px;
        }

        .TagsInput :global(.cancel){
          font-size: 1.2em;
          font-weight: bold;
          margin-left: 8px;
          color: #9fa3b9;
          cursor: pointer;
        }

        .TagsInput :global(.cancel):hover{
          color: #ff2a5f;
        }
      `}</style>
    </div>
  );
}

/**
 * THE TAG ITEM
 */
const Tag = ({ id, value, onDelete}) => (
  <div className="Tag">
    {value} <div className="cancel" onClick={() => onDelete(id)}>&times;</div> 
  </div>
)

export default TagsInput;
