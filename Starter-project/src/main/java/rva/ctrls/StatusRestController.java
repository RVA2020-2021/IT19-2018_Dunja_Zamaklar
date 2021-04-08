package rva.ctrls;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import rva.jpa.Departman;
import rva.jpa.Fakultet;
import rva.jpa.Status;
import rva.repository.StatusRepository;

@RestController
public class StatusRestController {

	@Autowired
	private StatusRepository statusRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("Status")
	public Collection<Status> getStatusi()
	{
		return statusRepository.findAll();
	}
	
	@GetMapping("Status/{id}")
	public Status getStatus(@PathVariable("id")Integer id)
	{
		return statusRepository.getOne(id);
	}
	
	
	 	 @GetMapping("StatusNaziv/{naziv}")
	public Collection<Status> getStatusByNaziv(@PathVariable("naziv")String naziv)
	{
		return statusRepository.findByNazivContainingIgnoreCase(naziv);
	}
	 	 
		@PostMapping("Status")
	public ResponseEntity<Status> insertStatus(@RequestBody Status status)
	{
		if(!statusRepository.existsById(status.getId()))
		{
			statusRepository.save(status);
			return new ResponseEntity<Status>(HttpStatus.OK);
		}
		return new ResponseEntity<Status>(HttpStatus.CONFLICT);
	}
		
	@PutMapping("Status")
	public ResponseEntity<Status> UpdateStatus(@RequestBody Status status)
	{
		if(statusRepository.existsById(status.getId()))
		{
			statusRepository.save(status);
			return new ResponseEntity<Status>(HttpStatus.OK);
		}
		return new ResponseEntity<Status>(HttpStatus.CONFLICT);
	}
	
	@Transactional
	@DeleteMapping("Status/{id}")
	public ResponseEntity<Status> deleteStatus(@PathVariable("id")Integer id)
	{
		if(statusRepository.existsById(id))
		{
			jdbcTemplate.execute("DELETE FROM student where status="+id);
			statusRepository.deleteById(id);
			if(id==-100)
			{
				jdbcTemplate.execute("insert into \"status\" (\"id\",\"naziv\",\"oznaka\") \r\n"
						+ "values (-100,'TestStatus','test');");
			}
			return new ResponseEntity<Status>(HttpStatus.OK);
		}
		return new ResponseEntity<Status>(HttpStatus.CONFLICT);
	}
	  
	
}
