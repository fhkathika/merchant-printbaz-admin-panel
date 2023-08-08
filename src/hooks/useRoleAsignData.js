import React, { useContext } from 'react';
import { AuthContext } from '../authProvider/AuthProvider';

export const useRoleAsignData = () => {
    const {adminUser,loading,loginAdminUser,currentUser}=useContext(AuthContext);
    console.log("adminUser",adminUser);

  const value_count={}
  adminUser?.roles?.forEach(obj=>{
    for(const key in obj){
      if(key!=='_id' && key!=='roleName' && obj[key]){
      
// if(value_count[key]){
//   value_count[key] = obj[key];
// }

  value_count[key] = obj[key];

      }
    }
  })
  console.log("value_count from hook",value_count);
  // <pre>{JSON.stringify(value_count, null, 2)}</pre>

    return{value_count}
};

