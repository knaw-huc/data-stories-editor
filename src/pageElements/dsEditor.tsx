import React from 'react';
import icon_arrowDown from '../assets/img/icons/icon-arrow-down.svg';


function DsEditor() {
    return (

      <div className="panel_edit fixedBottom" id="panel_edit">

        <div className="edit_header">
          <div className="panel_edit_wrap panel_edit__split">
            <div><strong>Edit markdown block</strong></div>
            <button type="button" name="button" id="panelHandleButton"  className="bt_icon">
                <img src={icon_arrowDown} alt="" />
            </button>
          </div>
        </div>

        <div className="panel_edit_inner panel_edit_wrap">


        <div className="edit_body">
          <div className="edit_segments">

            <a href="/">Text</a>
            <a href="/">Metadata</a>
            <a href="/">Notes and Comments</a>
            <a href="/">Provenance</a>
            <a href="/">Layout</a>
          </div>
          <div className="edit_workspace">
      <label htmlFor="te">Text</label>
      <textarea name="te">
This datastory uses Dutch death certificates from 1910-20 to map the temporal, spatial and social distribution of the 'Spanish' flu epidemic that hit The Netherlands in 1918-19.

## I. The dataset

Thanks to the indexation efforts of archives and the LINKS project, large parts of the Dutch civil registry ('Burgerlijke Stand') are now becoming available for historians. The death certificates used here are retrieved from openarch.nl (available here). From the individual death certificates files per archive, one combined dataset was created. One challenge of working with these certificates is that that the same certificate may have been indexed by more than one archive.

The table below demonstrates the success of the standardization efforts, presented as Linked Data.
      </textarea>
      </div>

        </div>


        </div>
      </div>

    )
}

export default DsEditor;
