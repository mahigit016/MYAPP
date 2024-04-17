import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await
axios('https://nijin-server.vercel.app/api/team-members');
        setTeamMembers(result.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const separateRoles = () => {
      const adminList = teamMembers.filter(member => member.role === 'admin');
      const memberList = teamMembers.filter(member => member.role === 'member');
      setAdmins(adminList);
      setMembers(memberList);
    };

    separateRoles();
  }, [teamMembers]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMembers = members.filter(member =>
    member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAdmins = admins.filter(admin =>
    admin.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="header-bar">
        <div className="team-member-message">Team</div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="container">
        <h2 className="subtitle">Administrators</h2>
        <ul className="team-list">
          {filteredAdmins.map(admin => (
            <li key={admin.email} className="team-member">
              <img src={admin.img} />
              <div className="member-info">
                <h2>{`${admin.first_name} ${admin.last_name}`}</h2>
                <p>{admin.email}</p>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="subtitle">Members</h2>
        <ul className="team-list">
          {filteredMembers.map(member => (
            <li key={member.email} className="team-member">
              <img src={member.img} alt={`${member.first_name}
${member.last_name}`} />
              <div className="member-info">
                <h2>{`${member.first_name} ${member.last_name}`}</h2>
                <p>{member.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;