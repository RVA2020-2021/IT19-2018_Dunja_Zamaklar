package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import rva.jpa.Fakultet;
import rva.jpa.Status;
import rva.repository.StatusRepository;

@RestController
public class StatusRestController {

	@Autowired
	private StatusRepository statusRepository;
	
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
	  
	
}
