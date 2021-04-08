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
import rva.repository.DepartmanRepository;
import rva.repository.StudentRepository;

@RestController
public class DepartmanRestController {
	
	/*injektovanje zavisnosti ->
	 1)korz konstruktor
	 2) kroz setter
	 3) kroz neko polje, navodjenjem anotacije omogucava instanciranje interfejsa
	 */
	
	@Autowired
	private DepartmanRepository departmanRepository;
	
	@Autowired
	private StudentRepository studentRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("Departman")
	public Collection<Departman> getDepartmani()
	{
		return departmanRepository.findAll();
	}
	
	@GetMapping("Departman/{id}")
	public Departman getDepartman(@PathVariable("id")Integer id)
	{
		return departmanRepository.getOne(id);
	}
	
	@GetMapping("DepartmanNaziv/{naziv}")
	public Collection<Departman> getDepartmanByNaziv(@PathVariable("naziv")String naziv)
	{
		return departmanRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	//vracamo status kod 
	@PostMapping("Departman")
	public ResponseEntity<Departman> insertDepartman(@RequestBody Departman departman)
	{
		if(!departmanRepository.existsById(departman.getId()))
		{
			departmanRepository.save(departman);
			return new ResponseEntity<Departman>(HttpStatus.OK);
		}
		return new ResponseEntity<Departman>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("Departman")
	public ResponseEntity<Departman> updateDepartman(@RequestBody Departman departman)
	{
		if(departmanRepository.existsById(departman.getId()))
		{
			departmanRepository.save(departman);
			return new ResponseEntity<Departman>(HttpStatus.OK);
		}
		return new ResponseEntity<Departman>(HttpStatus.CONFLICT);
	}
	
	 @Transactional
	 @DeleteMapping("Departman/{id}")
		public ResponseEntity<Departman> deleteDepartman(@PathVariable("id")Integer id)
		{
			if(departmanRepository.existsById(id))
			{
				jdbcTemplate.execute("delete from student where departman="+id);
				departmanRepository.deleteById(id);
				if(id==-100)
				{
					jdbcTemplate.execute("insert into \"departman\" (\"id\",\"naziv\",\"oznaka\",\"fakultet\")\r\n"
							+ "values (-100,'Test','test',1);");
				}
				return new ResponseEntity<Departman>(HttpStatus.OK);
			}
			return new ResponseEntity<Departman>(HttpStatus.CONFLICT);
		}
	
}
