package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import rva.jpa.Fakultet;
import rva.jpa.Student;
import rva.repository.StudentRepository;

@RestController
public class StudentRestController {

	@Autowired
	private StudentRepository studentRepository;
	
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
	  
}
