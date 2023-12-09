import { useState } from 'react';
import electricianData from './data/electricianData.json';
import rawSiteData from './data/rawSiteData.json';

import './App.css';

function App() {
  const [electricians, setElectricians] = useState(() =>
    electricianData.map(electrician => ({
      ...electrician,
      sitesAlloted: [],
    }))
  );

  const [sites, setSites] = useState(rawSiteData);

  const assignElectricians = () => {

    sites.forEach(site => {

      if (!site.AssignedElectritian.length) {
        const eligibleElectricians = electricians.filter(
          e => (!site.grievance && !e.grievanceElectrician) || (site.grievance && e.grievanceElectrician)
        );

        if (eligibleElectricians.length > 0) {

          const assignedElectrician = eligibleElectricians.shift();

          site.AssignedElectritian.push({
            electricianName: assignedElectrician.name,
            electricianAssignDate: new Date().toISOString(),
          });

          assignedElectrician.sitesAlloted.push(site);
        }
      }
    });

    setSites([...sites]);

    console.log('Electricians allotted:', electricians);
    console.log('Sites after allotment:', sites);
  };

  return (
    <div className="App">
      <button onClick={assignElectricians}>
        Allot Electrician Automatically
      </button>
    </div>
  );
}

export default App;
