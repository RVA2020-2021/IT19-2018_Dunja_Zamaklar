package rva.ctrls;

import java.util.Collection;

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
import rva.jpa.Student;
import rva.repository.DepartmanRepository;
import rva.repository.StatusRepository;
import rva.repository.StudentRepository;

@RestController
public class StudentRestController {

	@Autowired
	private StudentRepository studentRepository;
	
	@Autowired
	private DepartmanRepository departmanRepository;
	
	@Autowired
	private StatusRepository statusRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("Student")
	public Collection<Student> getStudenti()
	{
		return studentRepository.findAll();
	}
	
	@GetMapping("Student/{id}")
	public Student getStudent(@PathVariable("id")Integer id)
	{
		return studentRepository.getOne(id);
	}
	
	
	 	 @GetMapping("StudentIndeks/{brojIndeksa}")
	public Student getStudentByNaziv(@PathVariable("brojIndeksa")String brojIndeksa)
	{
		return studentRepository.findByBrojIndeksaContainingIgnoreCase(brojIndeksa);
	}
	 	 
	 	@GetMapping("StudentiDepartmanId/{id}")
		public Collection<Student> getStudentByDepartmanId(@PathVariable("id") Integer id)
		{
				return studentRepository.findByDepartman(departmanRepository.getOne(id));
		}
	
	 @GetMapping("StudentiSatusId/{id}")
		public Collection<Student> getStududentByStatusId(@PathVariable("id") Integer id)
		{
				return studentRepository.findByStatus(statusRepository.getOne(id));
		}
	
	  	@PostMapping("Student")
	public ResponseEntity<Student> insertStudent(@RequestBody Student student)
	{
		if(!studentRepository.existsById(student.getId()))
		{
			studentRepository.save(student);
			return new ResponseEntity<Student>(HttpStatus.OK);
		}
		return new ResponseEntity<Student>(HttpStatus.CONFLICT);
	}
	
 	@PutMapping("Student")
	public ResponseEntity<Student> updateStudent(@RequestBody Student student)
	{
		if(studentRepository.existsById(student.getId()))
		{
			studentRepository.save(student);
			return new ResponseEntity<Student>(HttpStatus.OK);
		}
		return new ResponseEntity<Student>(HttpStatus.CONFLICT);
	}
 	
 	@DeleteMapping("Student/{id}")
	public ResponseEntity<Student> deleteStudent(@PathVariable("id")Integer id)
	{
		if(studentRepository.existsById(id))
		{
			studentRepository.deleteById(id);
			if(id==-100)
			{
				jdbcTemplate.execute("insert into \"student\" (\"id\",\"ime\",\"prezime\",\"broj_indeksa\",\"status\",\"departman\")\r\n"
						+ "values (-100,'Test','Test','ge-Test',1,1);");
			}
			return new ResponseEntity<Student>(HttpStatus.OK);
		}
		return new ResponseEntity<Student>(HttpStatus.CONFLICT);
	}
 	
 	
	  	
		
   
	  
}
