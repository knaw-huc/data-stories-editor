import React from 'react';


function ModalOpenFile( {showOpenDialog, setShowOpenDialog, setCurrentDataStory, setDataStoryData, setLoading}: {showOpenDialog: boolean, setShowOpenDialog: Function, setCurrentDataStory: Function, setDataStoryData: Function, setLoading: Function}) {
  
  let open = showOpenDialog;
  function close() {
    setShowOpenDialog(!showOpenDialog);
  }

  function OpenFile(fileName: String) {
    console.log(fileName);
    setCurrentDataStory(fileName)
    setLoading(true)
    setDataStoryData({"_declaration": {}, "_instruction": {},"ds:DataStory": {}})
    setShowOpenDialog(!showOpenDialog)
    
    

  }
  
    return (
      <dialog open={open}>
        <div className='hc_marginTop1 hc_marginBot1 hc_elementAlign--right'><button onClick={close}>X</button></div>
        <div className="hc_list hc_list_noBullets hc_list_lines hc_list_interactive">
          <strong className='hc_marginTop1 hc_marginBot1'>Datastories</strong>
          <ul>
            <li onClick={() => OpenFile('new_datastory.xml')}>
              <div>
                New Datastory
              </div>
            </li>
            <li onClick={() => OpenFile('WP4-Story.xml')}>
              <div>
                The 1918-19 flu epidemic in The Netherlands
              </div>
            </li>
          </ul>
        </div>
    </dialog>
    )
}

export default ModalOpenFile;
