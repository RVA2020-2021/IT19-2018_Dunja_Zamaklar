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


import rva.jpa.Fakultet;
import rva.repository.FakultetRepository;

@RestController
public class FakultetRestController {
	
	@Autowired
	private FakultetRepository fakultetRepository;
	
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("Fakultet")
	public Collection<Fakultet> getFakulteti()
	{
		return fakultetRepository.findAll();
	}
	
	@GetMapping("Fakultet/{id}")
	public Fakultet getFakultet(@PathVariable("id")Integer id)
	{
		return fakultetRepository.getOne(id);
	}
	
	 @GetMapping("FakultetNaziv/{naziv}")
	public Collection<Fakultet> getFakultetByNaziv(@PathVariable("naziv")String naziv)
	{
		return fakultetRepository.findByNazivContainingIgnoreCase(naziv);
	}
	 
	 @PostMapping("Fakultet")
	public ResponseEntity<Fakultet> insertFakultet(@RequestBody Fakultet fakultet)
	{
		if(!fakultetRepository.existsById(fakultet.getId()))
		{
			fakultetRepository.save(fakultet);
			return new ResponseEntity<Fakultet>(HttpStatus.OK);
		}
		return new ResponseEntity<Fakultet>(HttpStatus.CONFLICT);
	}
	 
	 @PutMapping("Fakultet")
		public ResponseEntity<Fakultet> updateFakultet(@RequestBody Fakultet fakultet)
		{
			if(fakultetRepository.existsById(fakultet.getId()))
			{
				fakultetRepository.save(fakultet);
				return new ResponseEntity<Fakultet>(HttpStatus.OK);
			}
			return new ResponseEntity<Fakultet>(HttpStatus.CONFLICT);
		}
	
	 @Transactional
	 @DeleteMapping("Fakultet/{id}")
		public ResponseEntity<Fakultet> deleteFakultet(@PathVariable("id")Integer id)
		{
			if(fakultetRepository.existsById(id))
			{
						
				jdbcTemplate.execute("delete from student where departman in (select id from departman where fakultet="+id+")");			
				jdbcTemplate.execute("DELETE FROM departman where fakultet="+id);	
				fakultetRepository.deleteById(id);
				if(id==-100)
				{
					jdbcTemplate.execute("insert into \"fakultet\" (\"id\",\"naziv\",\"sediste\") \r\n"
							+ "values (-100,'TestFakultet','test');");
				}
				return new ResponseEntity<Fakultet>(HttpStatus.OK);
			}
			return new ResponseEntity<Fakultet>(HttpStatus.CONFLICT);
		}
}
